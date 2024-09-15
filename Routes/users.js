const express=require('express');
const router=express.Router();
const User=require('../models/user.js');
const { isError } = require('joi');
const passport=require('passport');
const asyncWrap=require('../util/wrapAync.js');
const {saveRedirectUrl}=require('../middleware.js')

const userController=require('../controllers/users.js')

// Get Signup Router
router.get("/signup",asyncWrap(userController.getSignupUser))


//Post Signup Router
router.post("/signup",asyncWrap(userController.postSignupUser))

//Get Login Router
router.get("/login",asyncWrap(userController.getLoginUser))

//Post Login Router
router.post("/login",saveRedirectUrl,passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash:true,})
    ,asyncWrap(userController.postLoginUser))

//Get Logout Router
router.get("/logout",asyncWrap(userController.logoutUser))




module.exports=router