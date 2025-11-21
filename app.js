const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate'); 
const methodOverride = require('method-override');
const listings = require('./Routes/listing.js'); 
const reviews = require('./Routes/review.js');
const session = require('express-session');
const flash = require('connect-flash');

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
const { resolveAny } = require('dns');


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

const sessionOptions = {
    secret: "Mysecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires : Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge : 1000 * 60 * 60 * 24 * 7, 
        httpOnly: true
    }
}

app.listen(PORT, () => {
    console.log('Server is running on port http://localhost:3000');
} );

app.get('/', (req, res) => {    
    res.render("listings/home.ejs");
});

//session and flash middleware
app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})

//routes
app.use('/listings', listings);
app.use("/listings/:id/reviews", reviews);


//custom error
  app.use((err, req, res, next) => {
    let {statusCode = 500 , message = "Something Went Wrong"} = err;
    res.render('error.ejs', { statusCode, message });
  });

