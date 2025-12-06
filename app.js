if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate'); 
const methodOverride = require('method-override');
const listings = require('./Routes/listing.js'); 
const reviews = require('./Routes/review.js');
const user = require('./Routes/user.js');
const session = require('express-session');
const flash = require('connect-flash');

const MongoStore = require('connect-mongo').default;

//passport setup
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');

// In your main app.js or server.js
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const store =  MongoStore.create({
    mongoUrl : process.env.MONGOURL,
    crypto:{
        secret : process.env.SESSION_SECRET || "Mysecretcode"
    },
    touchAfter : 24 * 3600
});

store.on("error", (e) => {
    console.log("SESSION STORE ERROR", e);
});

// session options and middleware must be registered before routes
const sessionOptions = {
    store : store,
    secret: process.env.SESSION_SECRET || "Mysecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires : Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge : 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
}



app.use(session(sessionOptions));
app.use(flash());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//flash middleware
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
});


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
    res.redirect("/listings");
});


//routes
app.use('/listings', listings);
app.use("/listings/:id/reviews", reviews);
app.use("/", user);

//custom error
  app.use((err, req, res, next) => {
    console.log(err);
    let {statusCode = 500 , message = "Something Went Wrong"} = err;
    res.render('error.ejs', { statusCode, message });
  });

