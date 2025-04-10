const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
    try {
        const saltRounds = 10;

        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const checkHashedPassword = async (userPassword, hashedPassword) => {
    const isConfirmed = await bcrypt.compare(userPassword, hashedPassword);

    return isConfirmed;
};

module.exports = { hashPassword, checkHashedPassword };
