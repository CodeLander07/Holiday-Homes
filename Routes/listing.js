const express = require('express');
const router = express.Router(); 
const wrapAsync = require('../utils/wrapAsync.js');
const { listingSchema } = require('../schema.js');
const Listing = require('../models/listing.js');
const { isLoggedIn , isOwner , validateListing } = require('../middleware.js');


//Index Route
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
        
       
        res.render("listings/show.ejs", { listing });
    } catch (err) {
        console.error("Error fetching listing:", err);
        res.status(400).send("Invalid Listing ID");
    }
}));

  //Edit Route
  router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync( async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  }));
  
  //Update Route
  router.put("/:id",isLoggedIn,isOwner, wrapAsync( async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash('success', 'Successfully Updated the listing!');
    res.redirect(`/listings/${id}`);
  }));
  
  //Delete Route
  router.delete("/:id", isLoggedIn,isOwner, wrapAsync( async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash('success', 'Successfully Deleted a listing!');
    res.redirect("/listings");
  }));


  module.exports = router;