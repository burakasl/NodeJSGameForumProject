const prisma = require("../../../prisma");
const {
    generateMessage,
    messageSchema,
} = require("../../../services/messageService");

const addGameToLibrary = async (req, res) => {
    const body = req.body;

    const library = await prisma.library.findUnique({
        where: {
            userId: body.userId,
        },
    });

    await prisma.libraryGame.create({
        data: {
            libraryId: library.id,
            gameId: body.gameId,
            statusId: body.statusId,
        },
    });

    return res
        .status(200)
        .send({ message: generateMessage(messageSchema.success) });
};

module.exports = addGameToLibrary;
