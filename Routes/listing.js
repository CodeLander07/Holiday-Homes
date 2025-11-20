const express = require('express');
const router = express.Router(); 
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/expressErrors.js');
const { listingSchema , reviewSchema  } = require('../schema.js');
const Listing = require('../models/listing.js');

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
router.post("/",validateListing, wrapAsync( async (req, res) => {

   let result = listingSchema.validateAsync(req.body);
   console.log(result);

    
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}));


//New Route
router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
  });

//Show Route
router.get("/:id",
    wrapAsync (async (req, res) => {
    let { id } = req.params;
    id = id.trim(); 
    try {
        const listing = await Listing.findById(id).populate('reviews');
        if (!listing) {
            return res.status(404).send("Listing not found");
        }
        res.render("listings/show.ejs", { listing });
    } catch (err) {
        console.error("Error fetching listing:", err);
        res.status(400).send("Invalid Listing ID");
    }
}));

  //Edit Route
  router.get("/:id/edit", wrapAsync( async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  }));
  
  //Update Route
  router.put("/:id", wrapAsync( async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
  }));
  
  //Delete Route
  router.delete("/:id",wrapAsync( async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
  }));


  module.exports = router;