const express = require('express');
const router = express.Router({mergeParams: true}); 
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/expressErrors.js');
const { reviewSchema } = require('../schema.js');
const Listing = require('../models/listing.js');
const Review = require('../models/review.js');


const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if(error){
        let errorMessage = error.details.map(el => el.message).join(', ');
        throw new ExpressError(errorMessage, 400);
    }
    else{
        next();
    }
}

  //add review
router.post("/" , validateReview, wrapAsync(async(req , res) =>{

    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    console.log("Review Added");
    res.redirect(`/listings/${listing._id}`);
  }));

//   delete review

router.delete("/:reviewId", wrapAsync(async (req, res) => {
        let { id, reviewId } = req.params;

        await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
        await Review.findByIdAndDelete(reviewId);

        res.redirect(`/listings/${id}`);


})
);

module.exports = router;