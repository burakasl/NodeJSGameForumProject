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
    "searchGame",
];

module.exports = authSchemas;
