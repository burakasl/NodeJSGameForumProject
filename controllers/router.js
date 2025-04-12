const express = require("express");
const router = express.Router();
const validate = require("../middlewares/dtoValidator");
const authorize = require("../middlewares/authorization");

//User endpoints
const login = require("./user/auth/login");
const register = require("./user/auth/register");
const createReview = require("./user/review/createReview");
const addGameToLibrary = require("./user/game/addGameToLibrary");

//Admin endpoints
const createGame = require("./admin/createGame");
const clearDatabase = require("./admin/clearDatabase");
const insertMockData = require("./admin/insertMockData");
const createAdminAccount = require("./admin/createAdminAccount");

//Admin routes
router.get("/clearDatabase", clearDatabase);
router.get("/insertMockData", insertMockData);
router.post("/createGame", validate, authorize, createGame);
router.post("/createAdminAccount", validate, createAdminAccount);

//User routes
router.post("/login", validate, login);
router.post("/register", validate, register);
router.post("/createReview", validate, authorize, createReview);
router.post("/addGameToLibrary", validate, authorize, addGameToLibrary);

module.exports = router;
