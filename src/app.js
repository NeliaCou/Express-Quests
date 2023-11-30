const express = require("express");

const app = express();

app.use(express.json());

const movieControllers = require("./controllers/movieControllers");
const userControllers = require("./controllers/userControllers");
const countParametersControllers = require("./controllers/countParametersControllers");
const validateMovie = require("./middlewares/validateMovie");
const validateUser = require("./middlewares/validateUser");
const validatecountParameters = require("./middlewares/validateCountParameters");

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.get("/api/users", userControllers.getUsers);
app.get("/api/users/:id", userControllers.getUsersById);
app.get("/api/countParameters", countParametersControllers.getCountParameters);
app.get(
  "/api/countParameters/:id",
  countParametersControllers.getcountParametersById
);

app.put("/api/movies/:id", movieControllers.updateMovie);
app.put("/api/users/:id", userControllers.updateUser);
app.put(
  "/api/countParameters/:id",
  countParametersControllers.updateCountParameters
);

app.post("/api/movies", validateMovie, movieControllers.postMovie);
app.post("/api/users", validateUser, userControllers.postUsers);
app.post(
  "/api/countParameters",
  validatecountParameters,
  countParametersControllers.postcountParameters
);

app.delete("/api/movies/:id", movieControllers.deleteMovie);
app.delete("/api/users/:id", userControllers.deleteUser);
app.delete(
  "/api/countParameters/:id",
  countParametersControllers.deleteCountParameters
);

module.exports = app;
