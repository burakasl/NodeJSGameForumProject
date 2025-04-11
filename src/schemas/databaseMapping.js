const dbMappingSchemas = {};

dbMappingSchemas.user = ["username", "email", "password", "phone", "roleId"];

dbMappingSchemas.game = [
    "name",
    "releaseDate",
    "description",
    "score",
    "imageUrl",
];

dbMappingSchemas.review = [
    "userId",
    "gameId",
    "title",
    "content",
    "score",
    "statusId",
];

module.exports = dbMappingSchemas;
