const prisma = require("../../prisma");
const { hashPassword } = require("../../services/hashService");

const createAdminAccount = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).send({ message: "Bir hata oluştu" });
    }

    const hashedPassword = await hashPassword(body.password);

    if (!hashedPassword) {
        return res.status(400).send({ message: "Bir hata oluştu." });
    }

    const insertedUser = await prisma.user.create({
        data: {
            username: body.username,
            email: body.email,
            password: hashedPassword,
            phone: body.phone,
            roleId: "85074f04-dc1b-453d-ad86-2948f7925180",
            isActive: true,
        },
    });

    if (!insertedUser) {
        return res.status(400).send({ message: "Bir hata oluştu" });
    }

    return res
        .status(200)
        .send({ message: "Admin hesabı başarıyla oluşturuldu" });
};

module.exports = createAdminAccount;
