const { dbInsert } = require("../../../services/databaseMapper");
const {
    generateMessage,
    messageSchema,
} = require("../../../services/messageService");

const createReview = async (req, res) => {
    const body = req.body;

    const insertedReview = await dbInsert(body, "review");

    if (!insertedReview) {
        return res
            .status(400)
            .send({ message: generateMessage(messageSchema.databaseError) });
    }

    return res
        .status(200)
        .send({ message: generateMessage(messageSchema.success) });
};

module.exports = createReview;
