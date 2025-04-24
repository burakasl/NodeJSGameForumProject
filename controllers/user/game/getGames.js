const prisma = require("../../../prisma");

const getGames = async (req, res, next) => {
    try {
        const searchText = req.body.searchText;

        const foundGames = await prisma.game.findMany({
            where: {
                name: {
                    contains: searchText,
                    mode: "insensitive",
                },
            },
            select: {
                id: true,
                imageUrl: true,
            },
        });

        return res.status(200).send({ games: foundGames });
    } catch (error) {
        next(error);
    }
};

module.exports = getGames;
