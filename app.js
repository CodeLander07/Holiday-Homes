const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate'); 
const methodOverride = require('method-override');
const listings = require('./Routes/listing.js'); 
const reviews = require('./Routes/review.js');


// In your main app.js or server.js
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
require('dotenv').config();


const { MongoClient, ServerApiVersion } = require('mongodb');
const { chownSync } = require('fs');


//mongodb connection string
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





//routes
app.use('/listings', listings);
app.use("/listings/:id/reviews", reviews);



//custom error
  app.use((err, req, res, next) => {
    let {statusCode = 500 , message = "Something Went Wrong"} = err;
    res.render('error.ejs', { statusCode, message });
  });

