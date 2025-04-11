const prisma = require("../../prisma");
const {
    generateMessage,
    messageSchema,
} = require("../../services/messageService");

const insertMockData = async (req, res) => {
    const role = await prisma.role.createMany({
        data: [{ roleName: "admin" }, { roleName: "user" }],
    });

    if (!role) {
        return res
            .status(400)
            .send({ message: generateMessage(messageSchema.fail) });
    }

    const userRole = await prisma.role.findUnique({
        where: { roleName: "user" },
    });
    const adminRole = await prisma.role.findUnique({
        where: { roleName: "admin" },
    });

    const createdUsers = await prisma.user.createMany({
        data: [
            {
                username: "test",
                email: "test@test.com",
                password:
                    "$2b$10$pW8ndgpw9hAdAkh.GR1Wg.uP2O9/P9RYrCdhEcyTSeC6Eew8zzBSy",
                roleId: userRole.id,
                isActive: true,
            },
            {
                username: "test2",
                email: "test2@test.com",
                password:
                    "$2b$10$pW8ndgpw9hAdAkh.GR1Wg.uP2O9/P9RYrCdhEcyTSeC6Eew8zzBSy",
                roleId: userRole.id,
                isActive: true,
            },
            {
                username: "test3",
                email: "test3@test.com",
                password:
                    "$2b$10$pW8ndgpw9hAdAkh.GR1Wg.uP2O9/P9RYrCdhEcyTSeC6Eew8zzBSy",
                roleId: userRole.id,
                isActive: true,
            },
        ],
    });

    if (!createdUsers) {
        return res
            .status(400)
            .send({ message: generateMessage(messageSchema.fail) });
    }

    const admin = await prisma.user.create({
        data: {
            username: "admin",
            email: "admin@test.com",
            password:
                "$2b$10$pW8ndgpw9hAdAkh.GR1Wg.uP2O9/P9RYrCdhEcyTSeC6Eew8zzBSy",
            roleId: adminRole.id,
            isActive: true,
        },
    });

    if (!admin) {
        return res
            .status(400)
            .send({ message: generateMessage(messageSchema.fail) });
    }

    const status = await prisma.status.createMany({
        data: [{ name: "Listed" }, { name: "Playing" }, { name: "Played" }],
    });

    if (!status) {
        return res
            .status(400)
            .send({ message: generateMessage(messageSchema.fail) });
    }

    return res.status(200).send({
        message: generateMessage(messageSchema.success),
    });
};

module.exports = insertMockData;
