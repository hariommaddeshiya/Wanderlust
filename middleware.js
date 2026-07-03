const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const {listingSchema} = require("./schema.js");
const expressError = require("./utils/expressError.js");
const {reviewSchema} = require("./schema.js");

module.exports.isLoggedIn = (req,res,next)=>{
        if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must be logged in!");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next)=>{
    res.locals.redirectUrl =  req.session.redirectUrl;
    next();
}

module.exports.isOwner = async (req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "You does not have permission of listing");
        return res.redirect(`/listings/${id}`);        
    }  
    next();  
}

module.exports.validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    //Print error message in console then below code will be clear 
    if(error){
        const errMsg = error.details.map((el)=> el.message).join(",");
        throw new expressError(400,errMsg);
    } else {
        next();
    }
};

module.exports.validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    //Print error message in console then below code will be clear 
    if(error){
        const errMsg = error.details.map((el)=> el.message).join(",");
        throw new expressError(400,errMsg);
    } else {
        next();
    }
}; 

module.exports.isReviewAuthor = async (req,res,next)=>{
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the author of this review");
        return res.redirect(`/listings/${id}`);        
    }  
    next();  
}