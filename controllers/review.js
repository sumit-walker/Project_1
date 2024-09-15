const Review=require('../models/reviews.js')
const Listing=require('../models/listing.js')


module.exports.addReview=async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(req.params.id);
    let addReview=new Review(req.body.review);
    listing.reviews.push(addReview);
    addReview.author=req.user._id;
    await addReview.save();
    await listing.save();
    console.log("new review added");
    // res.send("new review added");
    req.flash("success","Review Added")
    res.redirect(`/listing/${id}`)
}

module.exports.deleteReview=async(req,res)=>{
    let{id,reviewId}=req.params;

    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted")

    res.redirect(`/listing/${id}`)

}