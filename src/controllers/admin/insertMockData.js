const prisma = require("../../prisma");

const insertMockData = async (req, res) => {
    const createdUsers = await prisma.user.createMany({
        data: [
            {
                username: "test",
                email: "test@test.com",
                password:
                    "$2b$10$pW8ndgpw9hAdAkh.GR1Wg.uP2O9/P9RYrCdhEcyTSeC6Eew8zzBSy",
                roleId: "8ac66bc9-9a1f-4a2e-872e-1d61798fece8",
                isActive: true,
            },
            {
                username: "test2",
                email: "test2@test.com",
                password:
                    "$2b$10$pW8ndgpw9hAdAkh.GR1Wg.uP2O9/P9RYrCdhEcyTSeC6Eew8zzBSy",
                roleId: "8ac66bc9-9a1f-4a2e-872e-1d61798fece8",
                isActive: true,
            },
            {
                username: "test3",
                email: "test3@test.com",
                password:
                    "$2b$10$pW8ndgpw9hAdAkh.GR1Wg.uP2O9/P9RYrCdhEcyTSeC6Eew8zzBSy",
                roleId: "8ac66bc9-9a1f-4a2e-872e-1d61798fece8",
                isActive: true,
            },
        ],
    });

    if (!createdUsers) {
        return res
            .status(400)
            .send({ message: "Veri tabanına yazma işlemi başarısız oldu." });
    }

    const admin = await prisma.user.create({
        data: {
            username: "admin",
            email: "admin@test.com",
            password:
                "$2b$10$pW8ndgpw9hAdAkh.GR1Wg.uP2O9/P9RYrCdhEcyTSeC6Eew8zzBSy",
            roleId: "85074f04-dc1b-453d-ad86-2948f7925180",
        },
    });

    if (!admin) {
        return res
            .status(400)
            .send({ message: "Veri tabanına yazma işlemi başarısız oldu." });
    }
};

module.exports = insertMockData;
