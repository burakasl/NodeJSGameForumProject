const { dbInsert } = require("../../../services/databaseMapper");
const {
    generateMessage,
    messageSchema,
} = require("../../../services/messageService");

const createReview = async (req, res, next) => {
    try {
        const body = req.body;

        await dbInsert(body, "review");

        return res
            .status(200)
            .send({ message: generateMessage(messageSchema.success) });
    } catch (error) {
        next(error);
    }
};

module.exports = createReview;
