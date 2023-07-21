# WeLoveMovies
This is the backend for the WeLoveMovies website. To view the code for the frontend, visit [this link](https://github.com/DanielGroelle/starter-movie-front-end).

# Installation

To install, you must have Node.js and npm installed on your machine. In the directory where you saved the project, run `npm install` to install node modules, and then run `npm start` to start a local server.
It should start an instance on port 5001.
In order to connect this backend to a database, you must create a .env file with the parameter `DATABASE_URL` set to the url of your db.

# Files
| Path | Description |
| ----------- | ----------- |
| knexfile.js | contains code to perform migrations, run seeds, and connect to the database through an env file |
| src/db/connection.js | contains configuration for the environment and knex to perform database queries |
| src/db/migrations/ | contains migrations code that initializes the database with the required tables and columns |
| src/db/seeds/ | contains seed data that initializes the database with data |
| src/errors/ | contains various error handlers for non-existent routes and http methods that are not supported|
| src/movies/ | contains a .router, .controller, and .service file that route for the /movies route, handle data from the db, and perform queries to the db respectively |
| src/reviews/ | contains a .router, .controller, and .service file that route for the /reviews route, handle data from the db, and perform queries to the db respectively |
| src/theaters | contains a .router, .controller, and .service file that route for the /theaters route, handle data from the db, and perform queries to the db respectively |
| src/app.js | defines the backend app and routes to each route appropriately. also accomodates for CORS with the cors package |
| src/server.js | defines the port to listen on |
