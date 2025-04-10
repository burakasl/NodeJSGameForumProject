const prisma = require("../../prisma");
const { dbInsert } = require("../../services/databaseMappingService");

const createGame = async (req, res) => {
    const body = req.body;

    const insertGameResult = await dbInsert(body, "game");

    if (!insertGameResult || insertGameResult.code !== 0) {
        return res.status(400).send({ message: "Bir hata oluştu." });
    }

    return res.status(200).send({ message: "Oyun başarıyla eklendi." });
};

module.exports = createGame;
