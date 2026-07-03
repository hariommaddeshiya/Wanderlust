const express = require("express");
const router = express.Router({mergeParams: true});
const methodOverride = require("method-override");
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, isReviewAuthor, isLoggedIn, saveRedirectUrl} = require("../middleware.js");

const reviewController = require("../controller/review.js");

//Post Review Route
router.post("/", validateReview, wrapAsync(reviewController.createReview));

//Delete Review Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.deleteReview));



module.exports = router;