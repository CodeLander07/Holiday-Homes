const express = require('express');
const router = express.Router(); 
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/expressErrors.js');
const { listingSchema , reviewSchema  } = require('../schema.js');
const Listing = require('../models/listing.js');
const { isLoggedIn } = require('../middleware.js');

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if(error){
        let errorMessage = error.details.map(el => el.message).join(', ');
        throw new ExpressError(errorMessage, 400);
    }
    else{
        next();
    }
}
//Index ROute
router.get('/',
    validateListing
    ,wrapAsync( async (req, res) => {
    
    let allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  
}));

//Create Route
router.post("/",validateListing, isLoggedIn, wrapAsync( async (req, res) => {

   let result = listingSchema.validateAsync(req.body);
   console.log(result);

    
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash('success', 'Successfully created a new listing!');
    res.redirect("/listings");
}));


//New Route
router.get("/new", isLoggedIn, (req, res) => {

    res.render("listings/new.ejs");
  });

//Show Route
router.get("/:id",
    wrapAsync (async (req, res) => {
    let { id } = req.params;
    id = id.trim(); 
    try {
        const listing = await Listing.findById(id).populate('reviews').populate('owner');
        if (!listing) {
            req.flash('error', 'Listing not found!');
            return res.redirect('/listings');
        }
        
        console.log(listing);
        res.render("listings/show.ejs", { listing });
    } catch (err) {
        console.error("Error fetching listing:", err);
        res.status(400).send("Invalid Listing ID");
    }
}));

  //Edit Route
  router.get("/:id/edit",isLoggedIn, wrapAsync( async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  }));
  
  //Update Route
  router.put("/:id",isLoggedIn, wrapAsync( async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash('success', 'Successfully Updated the listing!');
    res.redirect(`/listings/${id}`);
  }));
  
  //Delete Route
  router.delete("/:id", isLoggedIn, wrapAsync( async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash('success', 'Successfully Deleted a listing!');
    res.redirect("/listings");
  }));


  module.exports = router;