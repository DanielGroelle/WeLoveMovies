const reviewsService = require("./reviews.service");

async function reviewExists(req, res, next) {
    const {reviewId} = req.params;
    res.locals.foundReview = await reviewsService.read(reviewId);
    if (res.locals.foundReview) {
        next();
    }
    else {
        next({message: `Review id cannot be found: ${reviewId}`, status: 404});
    }
}

async function list(req, res, next) {
    const {reviewId} = req.params;
    const data = await reviewsService.list(reviewId);
    res.send(200).json({data});
}

async function destroy(req, res, next) {
    const {reviewId} = req.params;
    await reviewsService.destroy(reviewId);
    res.sendStatus(204);
}

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