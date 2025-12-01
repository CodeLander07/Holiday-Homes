const express = require('express');
const router = express.Router({mergeParams: true}); 
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');
const userController = require('../controllers/user.controller.js');

router.get("/signup", userController.renderSignup);

router.get("/login" , userController.renderLogin);

router.post("/login" ,saveRedirectUrl,passport.authenticate('local',{
        failureFlash: true, 
        failureRedirect: '/login' , 
        failureFlash: 'Invalid username or password.'
    })
    ,userController.login);

router.get("/logout" ,userController.logout );

router.post("/signup" , userController.Signup);

module.exports = router;