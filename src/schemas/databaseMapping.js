const dbMappingSchemas = {};

dbMappingSchemas.user = ["username", "email", "password", "phone"];

dbMappingSchemas.game = [
    "name",
    "releaseDate",
    "description",
    "score",
    "imageUrl",
];

module.exports = dbMappingSchemas;
