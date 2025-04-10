const prisma = require("../../../prisma");
const { createToken } = require("../../../services/tokenService");
const { checkHashedPassword } = require("../../../services/hashService");

const login = async (req, res) => {
    const body = req.body;

    const user = await prisma.user.findUnique({
        where: { email: body.email },
        include: { role: true },
    });

    if (!user) {
        return res.status(404).send({ message: "Kullanıcı bulunamadı." });
    }

    if (!(await checkHashedPassword(body.password, user.password))) {
        return res.status(400).send({ message: "Hatalı şifre" });
    }

    const token = await createToken(user.id, user.role.roleName);

    if (!token) {
        return res.status(400).send({ message: "Bir hata oluştu." });
    }

    return res.status(200).send({ message: "Giriş başarılı", token: token });
};

module.exports = login;
