const authSchemas = {};

authSchemas.admin = [
    "login",
    "createMovie",
    "clearDatabase",
    "createGame",
    "insertMockData",
];

authSchemas.user = [
    "login",
    "register",
    "createReview",
    "viewProfile",
    "updateProfile",
    "addGameToLibrary",
];

module.exports = authSchemas;
