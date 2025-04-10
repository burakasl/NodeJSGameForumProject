const prisma = require("../prisma");
const { verifyToken } = require("../services/tokenService");
const authSchemas = require("../schemas/authorization");

const authorize = async (req, res, next) => {
    const path = req.route.path;

    if (!path) {
        return res.status(400).send({ message: "Bir hata oluştu" });
    }

    const header = req.headers["authorization"];

    if (!header) {
        return res.status(400).send({ message: "Bir hata oluştu." });
    }

    //Bearer token şeklinde bir girdi bekleniyor.
    const token = header.split(" ")[1];

    if (!token) {
        return res.status(400).send({ message: "Kimlik doğrulama sorunu" });
    }

    const tokenData = verifyToken(token);

    if (!tokenData) {
        return res.status(400).send({ message: "Kimlik doğrulama sorunu" });
    }

    const schemaKey = tokenData.userRole;
    const authSchema = authSchemas[schemaKey];

    if (!authSchema) {
        return res.status(400).send({ message: "Bir hata oluştu." });
    }

    if (!authSchema.some((allowedPath) => allowedPath === path)) {
        return res.status(400).send({ message: "Yetkisiz işlem" });
    }

    const userId = tokenData.userId;

    const insertedToken = await prisma.token.findUnique({
        where: {
            userId: userId,
        },
    });

    if (!insertedToken) {
        return res.status(400).send({ message: "Kimlik doğrulama sorunu" });
    }

    if (insertedToken.token !== token) {
        return res.status(400).send({ message: "Kimlik doğrulama sorunu" });
    }

    req.userId = userId;

    next();
};

module.exports = authorize;
