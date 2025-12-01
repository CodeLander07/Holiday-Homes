const express = require('express');
const router = express.Router({mergeParams: true}); 
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');
const userController = require('../controllers/user.controller.js');


router.route("/signup")
    .get(userController.renderSignup)
    .post( userController.Signup);

router.route("/login")
    .get(userController.renderLogin)
    .post(saveRedirectUrl,passport.authenticate('local',{
        failureFlash: true, 
        failureRedirect: '/login' , 
        failureFlash: 'Invalid username or password.'
    })
    ,userController.login);

router.get("/logout" ,userController.logout );

module.exports = router;