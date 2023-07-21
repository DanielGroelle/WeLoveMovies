const reviewsService = require("./reviews.service");

//checks if the reviewId in the route exists in the db and saves the review data to res.locals for later use
async function reviewExists(req, res, next) {
    const {reviewId} = req.params;
    res.locals.foundReview = await reviewsService.read(reviewId);
    if (res.locals.foundReview) {
        next();
    }
    //if it doesnt exist return an error
    else {
        next({message: `Review id cannot be found: ${reviewId}`, status: 404});
    }
}

//list all reviews that match the movieId
async function list(req, res, next) {
    const {movieId} = req.params;
    const data = await reviewsService.list(movieId);
    res.status(200).json({data});
}

//delete a review based on reviewId
async function destroy(req, res, next) {
    const {reviewId} = req.params;
    await reviewsService.destroy(reviewId);
    res.sendStatus(204);
}

//update a review based on reviewId and the data in the body of the request
async function update(req, res, next) {
    const givenReviewData = req.body.data;
    const {reviewId} = req.params;
    const reviewData = {
        ...res.locals.foundReview,
        ...givenReviewData,
        review_id: Number(reviewId)
    };
    
    const data = await reviewsService.update(reviewId, reviewData);
    res.status(201).json({data});
}

module.exports = {
    destroy: [reviewExists, destroy],
    update: [reviewExists, update],
    list,
}