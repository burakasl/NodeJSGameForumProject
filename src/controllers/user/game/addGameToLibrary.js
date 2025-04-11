const prisma = require("../../../prisma");
const {
    generateMessage,
    messageSchema,
} = require("../../../services/messageService");

const addGameToLibrary = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res
            .status(400)
            .send({ message: generateMessage(messageSchema.unknownError) });
    }

    const library = await prisma.library.findUnique({
        where: {
            userId: req.body.userId,
        },
    });

    if (!library) {
        return res
            .status(400)
            .send({ message: generateMessage(messageSchema.unknownError) });
    }

    const updatedLibrary = await prisma.libraryGame.create({
        data: {
            libraryId: library.id,
            gameId: req.body.gameId,
        },
    });

    if (!updatedLibrary) {
        return res
            .status(400)
            .send({ message: generateMessage(messageSchema.unknownError) });
    }

    return res
        .status(200)
        .send({ message: generateMessage(messageSchema.success) });
};

module.exports = addGameToLibrary;
