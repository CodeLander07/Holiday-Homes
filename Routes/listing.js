const express = require('express');
const router = express.Router(); 
const wrapAsync = require('../utils/wrapAsync.js');
const Listing = require('../models/listing.js');
const { isLoggedIn , isOwner , validateListing } = require('../middleware.js');
const ListingControllers=  require (  "../controllers/listings.js");

//Index Route
router.get('/', wrapAsync( ListingControllers.index));

//New Route
router.get("/new", isLoggedIn , ListingControllers.renderNewForm);

//Show Route
router.get("/:id", wrapAsync( ListingControllers.showListing));

//Create Route
router.post("/",validateListing, isLoggedIn, wrapAsync(ListingControllers.createListing));

//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(ListingControllers.renderEditForm));
  
  //Update Route
  router.put("/:id",isLoggedIn,isOwner, wrapAsync(ListingControllers.updateListing));
  
  //Delete Route
  router.delete("/:id", isLoggedIn,isOwner, wrapAsync(ListingControllers.destroyListing));


  module.exports = router;