const express=require('express');
const router=express.Router();
const Listing=require('../models/listing.js');
const ExpressError=require("../util/ExpressError.js")
const {listingSchema,reviewSchema}=require("../schema.js")
const flash=require('connect-flash');
const {isLoggedIn,isOwner,validateListing}=require('../middleware.js');
const asyncWrap=require("../util/wrapAync.js")

const listingController=require("../controllers/listing.js");

const multer  = require('multer')
const {storage}=require('../cloudeConfig.js')
const upload = multer({storage})

// Index Router
router.get("/",asyncWrap(listingController.index));

//New Router
router.get("/new",isLoggedIn,asyncWrap(listingController.newListing))

//show Router
router.get("/:id",asyncWrap(listingController.showListing));


//Create Router
router.post("/",
    upload.single('listing[image]'),
    asyncWrap(listingController.createListing)
     
)



//Get Edit Router
router.get("/:id/edit",
    isLoggedIn,isOwner,asyncWrap(listingController.getEditListing))

// Put Edit Router
router.put("/:id",
    upload.single('listing[image]'),
    asyncWrap(listingController.putEditListing));

//Delete Router
router.delete("/:id",isLoggedIn,isOwner,asyncWrap(listingController.deleteListing))




module.exports=router;