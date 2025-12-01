const express = require('express');
const router = express.Router(); 
const wrapAsync = require('../utils/wrapAsync.js');
const { isLoggedIn , isOwner , validateListing } = require('../middleware.js');
const ListingControllers=  require (  "../controllers/listings.js");
const multer = require('multer');
const {storage} = require('../cloudConfig.js');
const upload = multer({ storage: storage });



router
    .route('/')
    .get(wrapAsync( ListingControllers.index))
    // .post(validateListing, isLoggedIn, wrapAsync(ListingControllers.createListing));
    .post(upload.single('listing[image]'),(req, res)=>{
        res.send(req.file);
    })

//New Route
router.get("/new", isLoggedIn , ListingControllers.renderNewForm);

router
    .route("/:id")
    .get(wrapAsync( ListingControllers.showListing))
    .put(isLoggedIn,isOwner, wrapAsync(ListingControllers.updateListing))
    .delete(isLoggedIn,isOwner, wrapAsync(ListingControllers.destroyListing));





//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(ListingControllers.renderEditForm));
  




module.exports = router;