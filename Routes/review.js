const express=require('express');
const router=express.Router({mergeParams:true});
const Review=require('../models/reviews.js')
const ExpressError=require("../util/ExpressError.js")
const Listing=require('../models/listing.js');
const {listingSchema,reviewSchema}=require("../schema.js")
const asyncWrap=require('../util/wrapAync.js')
const {isLoggedIn,validateReview,isAuthor}=require('../middleware.js');

const reviewController=require('../controllers/review.js')




//Add review Router
router.post("/",isLoggedIn,validateReview,asyncWrap(reviewController.addReview))

//delete review
router.delete("/:reviewId",isLoggedIn,isAuthor,asyncWrap(reviewController.deleteReview))



module.exports=router;