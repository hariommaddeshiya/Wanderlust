const mongoose = require("mongoose");
const Review = require("./review.js");

let listingSchema = new  mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,

    image: {
    filename: {
        type: String,
        default: "listingimage"
    },
    url: {
        type: String,
        default: "https://images.adsttc.com/media/images/59ef/fef7/b22e/3819/9400/0018/medium_jpg/999_47.jpg?1508900596",
        //New Concept add 
        set: (v) => v === ""? "https://images.adsttc.com/media/images/59ef/fef7/b22e/3819/9400/0018/medium_jpg/999_47.jpg?1508900596": v
        }
    },
    price: Number,
    location: String,
    country: String,
    review: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }],
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

// Mongoose Middleware BEFORE model creation
listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.review}});
    }
});


const Listing = new mongoose.model("Listing", listingSchema);


module.exports = Listing;
