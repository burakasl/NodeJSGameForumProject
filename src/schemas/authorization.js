const authSchemas = {};

authSchemas.root = ["createAdminAccount"];

authSchemas.admin = ["login", "createMovie", "clearDatabase"];

authSchemas.user = [
    "login",
    "register",
    "createReview",
    "viewProfile",
    "updateProfile",
];

module.exports = authSchemas;
