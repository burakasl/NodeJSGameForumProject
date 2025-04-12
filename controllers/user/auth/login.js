const prisma = require("../../../prisma");
const { createToken } = require("../../../services/tokenService");
const { checkHashedPassword } = require("../../../services/hashService");
const {
    generateMessage,
    messageSchema,
} = require("../../../services/messageService");

const login = async (req, res, next) => {
    try {
        const body = req.body;

        const user = await prisma.user.findUnique({
            where: { email: body.email },
            include: { role: true },
        });

        if (!user) {
            return res
                .status(404)
                .send({ message: generateMessage(messageSchema.userNotFound) });
        }

        if (!(await checkHashedPassword(body.password, user.password))) {
            return res.status(400).send({
                message: generateMessage(messageSchema.incorrectPassword),
            });
        }

        const token = await createToken(user.id, user.role.roleName);

        return res.status(200).send({ token: token });
    } catch (error) {
        next(error);
    }
};

module.exports = login;
