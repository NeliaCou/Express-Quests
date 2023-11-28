const express = require("express");

const app = express();

app.use(express.json());

const movieControllers = require("./controllers/movieControllers");
const users = require("./controllers/userControllers");
app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.get("/api/users", users.getUsers);
app.get("/api/users/:id", users.getUsersById);
app.post("/api/movies", movieControllers.postMovie);
app.post("/api/users", users.postUsers);
app.put("/api/movies/:id", movieControllers.updateMovie);

module.exports = app;
