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

async function list(movieId) {
    const reviewData = await knex("reviews")
        .select("*")
        .where({"movie_id": Number(movieId)});

    const criticData = await knex("critics as c")
        .select(["c.*"])
        .join("reviews as r", "r.critic_id", "=", "c.critic_id")
        .where({"movie_id": Number(movieId)});

    //creating a key value pair between the critic id and critic data
    const criticIdToCritic = {};
    for (const critic of criticData) {
        criticIdToCritic[critic.critic_id] = critic;
    }

    //joining the critic data with each review
    return reviewData.map(review => {
        return {
            ...review,
            critic: criticIdToCritic[review.critic_id]
        }
    });
}

module.exports = {
    read,
    destroy,
    update,
    list,
}