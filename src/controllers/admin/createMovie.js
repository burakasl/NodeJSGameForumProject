const prisma = require("../../prisma");

const createMovie = async (req, res) => {
    const body = req.body;

    const insertedMovie = await prisma.movie.create({
        data: {
            name: body.name,
            releaseDate: body.releaseDate,
            description: body.description,
            imdbScore: body.imdbScore,
            imageUrl: "test",
            isActive: true,
        },
    });

    if (!insertedMovie) {
        return res.status(400).send({ message: "Bir hata oluştu." });
    }

    return res.status(200).send({ message: "Film başarıyla eklendi." });
};

module.exports = createMovie;
