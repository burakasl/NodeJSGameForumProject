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

    let insertedData = await prisma[tableName].create({ data: data });

    insertedData = undefined;

    if (!insertedData) {
        console.log("Veri tabanı bağlantısını kontrol edin.");
        throw new Error();
    }
};

module.exports = { dbInsert };
