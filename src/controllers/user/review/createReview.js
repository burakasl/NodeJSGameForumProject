const prisma = require("../../../prisma");

const createReview = async (req, res) => {
    const body = req.body;

    const insertedReview = await prisma.review.create({
        data: {
            userId: req.userId,
            movieId: body.movieId,
            title: body.title,
            content: body.content,
            score: body.score,
            statusId: body.statusId,
            isActive: true,
        },
    });

    if (!insertedReview) {
        return res.status(400).send({ message: "Bir hata oluştu." });
    }

    return res
        .status(200)
        .send({ message: "İşlem başarıyla gerçekleştirildi." });
};

module.exports = createReview;
