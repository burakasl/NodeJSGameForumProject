const dbMappingSchemas = {};

dbMappingSchemas.user = ["username", "email", "password", "phone", "roleId"];

dbMappingSchemas.game = [
    "name",
    "releaseDate",
    "description",
    "score",
    "imageUrl",
];

module.exports = dbMappingSchemas;
