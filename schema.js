const joi = require('joi');

const listingSchema = joi.object({
    listing: joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        location: joi.string().required(),
        country: joi.string().required(),
        price: joi.number().required(),
        //note the image is an object with a url property, and both the image object and the url can be null or empty string
        image: joi.object({           
            url: joi.string().allow("", null),
            filename: joi.string().allow("", null) 
        }).allow("",null)
    }).required()
});

const reviewSchema = joi.object({
    review: joi.object({
        rating: joi.number().required().min(1).max(5),
        comment: joi.string().required(),
    }).required()
});

//Can only module.export once not diff. for both
module.exports = {listingSchema,reviewSchema};
