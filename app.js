const express = require('express');
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate'); 
const methodOverride = require('method-override');
const wrapAsync = require('./utils/wrapAsync.js');
const ExpressError = require('./utils/expressErrors.js');
const { wrap } = require('module');
const { listingSchema } = require('./schema.js');

// In your main app.js or server.js
app.use(express.urlencoded({ extended: true }));

app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
require('dotenv').config();


const { MongoClient, ServerApiVersion } = require('mongodb');
const { chownSync } = require('fs');
//momgodb connection string
const MONGOURL = process.env.MONGOURL;
const PORT = process.env.PORT || 3000;

main()
.then(() =>{
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); });

async function main() {

    await mongoose.connect(MONGOURL);
    
}




app.listen(PORT, () => {
    console.log('Server is running on port http://localhost:3000');
} );

app.get('/', (req, res) => {    
    res.render("listings/home.ejs");
});


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
app.get('/listings',
    validateListing
    ,wrapAsync( async (req, res) => {
    
    let allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  
}));

//Create Route
app.post("/listings",validateListing, wrapAsync( async (req, res) => {

   let result = listingSchema.validateAsync(req.body);
   console.log(result);

    
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}));


//New Route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
  });

//Show Route
app.get("/listings/:id",wrapAsync (async (req, res) => {
    let { id } = req.params;
    id = id.trim(); 
    try {
        const listing = await Listing.findById(id);
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
  app.get("/listings/:id/edit", wrapAsync( async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  }));
  
  //Update Route
  app.put("/listings/:id", wrapAsync( async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
  }));
  
  //Delete Route
  app.delete("/listings/:id",wrapAsync( async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
  }));



  //custom error
  app.use((err, req, res, next) => {
    // console.error(err.stack);
    let {statusCode = 500 , message = "Something Went Wrong"} = err;
    res.render('error.ejs', { statusCode, message });
  });


  //add review
  app.post("/listings/:id/reviews" , async(req , res) =>{

    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    

    console.log("Review Added");
    res.redirect(`/listings/${listing._id}`);
  })