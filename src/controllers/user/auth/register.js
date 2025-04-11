const prisma = require("../../../prisma");
const { createToken } = require("../../../services/tokenService");
const { hashPassword } = require("../../../services/hashService");
const { dbInsert } = require("../../../services/databaseMappingService");
const {
    generateMessage,
    messageSchema,
} = require("../../../services/messageService");

const register = async (req, res, next) => {
    try {
        const body = req.body;

        if (!(await checkUsernameAvailability(body.username))) {
            return res.status(400).send({
                message: generateMessage(messageSchema.usernameInUse),
            });
        }

        if (!(await checkEmailAvailability(body.email))) {
            return res
                .status(400)
                .send({ message: generateMessage(messageSchema.emailInUse) });
        }

        const hashedPassword = await hashPassword(body.password);

        if (!hashedPassword) {
            return res.status(400).send({
                message: generateMessage(messageSchema.unknownError),
            });
        }

        body.password = hashedPassword;

        const userRole = await prisma.role.findUnique({
            where: { roleName: "user" },
        });

        if (!userRole) {
            return res
                .status(400)
                .send({ message: generateMessage(messageSchema.unknownError) });
        }

        body.roleId = userRole.id;

        const insertUserResult = await dbInsert(body, "user");

        if (!insertUserResult || insertUserResult.code !== 0) {
            return res
                .status(400)
                .send({ message: generateMessage(messageSchema.unknownError) });
        }

        const token = createToken(insertUserResult.data.id, "user");

        if (!token) {
            return res
                .status(400)
                .send({ message: generateMessage(messageSchema.unknownError) });
        }

        const createdLibrary = await prisma.library.create({
            data: {
                userId: req.body.userId,
                isActive: true,
            },
        });

        if (!createdLibrary) {
            return res
                .status(400)
                .send({
                    message: generateMessage(messageSchema.databaseError),
                });
        }

        return res.status(200).send({
            message: generateMessage(messageSchema.createUser),
            token: token,
        });
    } catch (error) {
        return res.status(400).send({
            message: error.message,
        });
    }
};

const checkEmailAvailability = async (email) => {
    const foundUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    return !foundUser;
};

const checkUsernameAvailability = async (username) => {
    const foundUser = await prisma.user.findUnique({
        where: {
            username: username,
        },
    });

    return !foundUser;
};

module.exports = register;
