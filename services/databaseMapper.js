const prisma = require("../prisma");
const dbMappingSchemas = require("../schemas/databaseMapping");
const {
    generateMessage,
    messageSchema,
} = require("../services/messageService");

const dbInsert = async (body, tableName) => {
    const data = {};
    const schema = dbMappingSchemas[tableName];

    for (const field of schema) {
        if (body[field] !== undefined) {
            data[field] = body[field];
        }
    }

    data.isActive = true;

    await prisma[tableName].create({ data: data });
};

module.exports = { dbInsert };
