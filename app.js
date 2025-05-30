const express = require('express');
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate'); 
const methodOverride = require('method-override');


// In your main app.js or server.js
app.use(express.urlencoded({ extended: true }));

app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));




//momgodb connection string
const MONGOURL = "mongodb://127.0.0.1:27017/wanderlust";

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




app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
} );

app.get('/', (req, res) => {    
    res.render("listings/home.ejs");
});





//Index ROute
app.get('/listings', async (req, res) => {
    
    let allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  
});

//Create Route
app.post("/listings", async (req, res) => {
  console.log(req.body);
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  });

//New Route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
  });

//Show Route
app.get("/listings/:id", async (req, res) => {
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
});

  //Edit Route
  app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  });
  
  //Update Route
  app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
  });
  
  //Delete Route
  app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
  });

