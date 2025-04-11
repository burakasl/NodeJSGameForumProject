const authSchemas = {};

authSchemas.root = ["createAdminAccount"];

authSchemas.admin = ["login", "createMovie", "clearDatabase", "createGame"];

authSchemas.user = [
    "login",
    "register",
    "createReview",
    "viewProfile",
    "updateProfile",
];

module.exports = authSchemas;
