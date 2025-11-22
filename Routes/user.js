const express = require('express');
const router = express.Router({mergeParams: true}); 
const User = require('../models/user.js');
const passport = require('passport');

router.get("/signup" , (req, res) => {
    res.render("user/signup.ejs");
});

router.get("/login" , (req, res) =>{
    res.render("user/login.ejs");
});

router.post("/login" , 
    passport.authenticate('local', 
        {failureFlash: true, failureRedirect: '/login' , failureFlash: 'Invalid username or password.'}),
        async (req, res) => {
    req.flash('success', 'Welcome back! to Holiday Homes');
    res.redirect("/listings");
});

router.get("/logout" , (req, res) => {
    req.logout((err) => {
        if(err){
            return next(err);
        }
    });
    req.flash('success', 'You have logged out successfully!');
    res.redirect("/listings");
});

router.post("/signup" , async (req, res) => {
    try{
        let { username, email, password } = req.body;

    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);

    console.log("User Registered:", registeredUser);
    req.flash('success', 'Welcome to Holiday Homes!');
    res.redirect("/listings");
    }
    catch(e){
        req.flash('error', e.message);
        res.redirect("signup");
    }

});

module.exports = router;