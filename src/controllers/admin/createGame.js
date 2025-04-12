const prisma = require("../../prisma");
const { dbInsert } = require("../../services/databaseMapper");

const createGame = async (req, res, next) => {
    try {
        const body = req.body;

        const insertGameResult = await dbInsert(body, "game");

        return res.status(200).send({ message: "Oyun başarıyla eklendi." });
    } catch (error) {
        next(error);
    }
};

module.exports = createGame;
