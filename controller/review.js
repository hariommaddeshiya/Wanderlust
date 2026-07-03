const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.createReview = async(req,res,next)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author  = req.user._id;
    listing.review.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Added!");

    res.redirect(`/listings/${listing._id}`)
}

module.exports.deleteReview = async(req,res,next)=>{
    let {id, reviewId} = req.params;

    await Review.findByIdAndDelete(reviewId);
    //pull operator use:- to pull out or delete something from it 
    await Listing.findByIdAndUpdate(id,{$pull: {review: reviewId }});
    req.flash("success", "Review Deleted Successfully!");

    res.redirect(`/listings/${id}`);
}