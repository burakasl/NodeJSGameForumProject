const express = require("express");
const router = express.Router();
const validate = require("../middlewares/dtoValidator");
const authorize = require("../middlewares/authorization");

//User endpoints
const login = require("./user/auth/login");
const register = require("./user/auth/register");
const createReview = require("./user/review/createReview");

//Admin endpoints
const createGame = require("./admin/createGame");
const clearDatabase = require("./admin/clearDatabase");
const createAdminAccount = require("./admin/createAdminAccount");

//Admin routes
router.get("/clearDatabase", authorize, clearDatabase);
router.post("/createGame", validate, authorize, createGame);
router.post("/createAdminAccount", validate, createAdminAccount);

//User routes
router.post("/login", validate, login);
router.post("/register", validate, register);
router.post("/createReview", validate, authorize, createReview);

module.exports = router;
