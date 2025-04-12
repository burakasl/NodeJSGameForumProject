const jwt = require("jsonwebtoken");
const prisma = require("../prisma");

const createToken = async (userId, userRole) => {
    const secretKey = process.env.JWT_KEY;

    const payload = {
        userId: userId,
        userRole: userRole,
    };

    const options = {
        expiresIn: "4h",
    };

    const token = jwt.sign(payload, secretKey, options);

    const previousToken = await prisma.token.findUnique({
        where: {
            userId: userId,
        },
    });

    if (previousToken) {
        const isPrevRemoved = await prisma.token.delete({
            where: {
                userId: userId,
            },
        });

        if (!isPrevRemoved) {
            return null;
        }
    }

    const isSuccessful = await prisma.token.create({
        data: { token: token, userId: userId, userRole: userRole },
    });

    if (isSuccessful) {
        return token;
    } else {
        return null;
    }
};

const verifyToken = (token) => {
    const secretKey = process.env.JWT_KEY;

    try {
        const decodedData = jwt.verify(token, secretKey);
        return decodedData;
    } catch (error) {
        console.log(error);
        return null;
    }
};

module.exports = { createToken, verifyToken };
