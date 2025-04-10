const prisma = require("../prisma");
const dbMappingSchemas = require("../schemas/databaseMapping");

const dbInsert = async (body, tableName) => {
    const data = {};
    const schema = dbMappingSchemas[tableName];

    if (!schema) {
        return {
            code: 1,
        };
    }

    for (const field of schema) {
        if (body[field] !== undefined) {
            data[field] = body[field];
        }
    }

    data.isActive = true;

    const insertedData = await prisma[tableName].create({ data: data });

    if (!insertedData) {
        return {
            code: 1,
        };
    }

    return {
        code: 0,
        data: insertedData,
    };
};

const dbUpdate = () => {};

const dbDelete = () => {};

module.exports = { dbInsert, dbUpdate, dbDelete };
