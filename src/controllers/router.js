const express = require("express");
const router = express.Router();
const validate = require("../middlewares/dtoValidator");
const authorize = require("../middlewares/authorization");

//User endpoints
const login = require("./user/auth/login");
const register = require("./user/auth/register");
const createReview = require("./user/review/createReview");

//Admin endpoints
const createMovie = require("./admin/createMovie");
const clearDatabase = require("./admin/clearDatabase");
const createAdminAccount = require("./admin/createAdminAccount");

//Admin routes
router.get("/clearDatabase", authorize, clearDatabase);
router.post("/createMovie", validate, authorize, createMovie);
router.post("/createAdminAccount", validate, createAdminAccount);

//User routes
router.post("/login", validate, login);
router.post("/register", validate, register);
router.post("/createReview", validate, authorize, createReview);
router.post("/createMovie", validate, authorize, createMovie);

module.exports = router;
