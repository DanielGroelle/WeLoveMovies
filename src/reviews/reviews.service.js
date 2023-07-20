const knex = require("../db/connection");

function read(reviewId) {
    const foundReview = knex("reviews")
        .select("*")
        .where({"review_id": Number(reviewId)})
        .then((data)=>data[0]);
        
    return foundReview;
}

function destroy(reviewId) {
    return knex("reviews")
        .where({"review_id": Number(reviewId)})
        .del();
}

async function update(reviewId, reviewData) {
    //perform the update
    await knex("reviews")
        .where({"review_id": Number(reviewId)})
        .update(reviewData, ["*"]);

    //get new review data
    let data = await knex("reviews")
        .select("*")
        .where({"review_id": Number(reviewId)})
        .then((data)=>data[0]);

    //append the critic data to the review
    data.critic = await knex("critics")
        .select("*")
        .where({"critic_id": reviewData.critic_id})
        .then((data)=>data[0]);

    return data;
}

module.exports = {
    read,
    destroy,
    update,
}