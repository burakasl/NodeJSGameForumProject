const prisma = require("../../../prisma");
const { verifyToken } = require("../../../services/token");

const viewProfile = async (req, res) => {
    const tokenHeader = req.headers["token"];

    if (!authHeader) {
        return res.status(401).send({
            message: "Yetkisiz işlem",
        });
    }

    const token = tokenHeader.token;

    const decodedData = verifyToken(token);

    if (!decodedData || decodedData.userId) {
        return res.status(401).send({
            message: "Yetkisiz işlem",
        });
    }

    const user = await prisma.user.findUnique({
        where: {
            id: decodedData.userId,
        },
    });

    return res.status(200).send({
        message: "Profile bilgileri alındı.",
        data: {
            username: user.username,
            email: user.email,
            phone: user.phone,
        },
    });
};

module.exports = { viewProfile };
