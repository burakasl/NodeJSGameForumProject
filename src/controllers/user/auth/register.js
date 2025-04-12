const prisma = require("../../../prisma");
const { createToken } = require("../../../services/tokenService");
const { hashPassword } = require("../../../services/hashService");
const { dbInsert } = require("../../../services/databaseMapper");
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

        body.password = hashedPassword;

        const userRole = await prisma.role.findUnique({
            where: { roleName: "user" },
        });

        body.roleId = userRole.id;

        const insertUserResult = await dbInsert(body, "user");

        const token = createToken(insertUserResult.data.id, "user");

        await prisma.library.create({
            data: {
                userId: req.body.userId,
                isActive: true,
            },
        });

        return res.status(200).send({
            message: generateMessage(messageSchema.createUser),
            token: token,
        });
    } catch (error) {
        next(error);
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
