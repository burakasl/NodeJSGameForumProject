const { Prisma } = require("@prisma/client");
const prisma = require("../../prisma");

const clearDatabase = async (req, res) => {
    for (const modelName of Object.values(Prisma.ModelName)) {
        await prisma[modelName.toLowerCase()].deleteMany();
    }

    return res
        .status(200)
        .send({ message: "Veri tabanı tabloları temizlendi." });
};

module.exports = clearDatabase;
