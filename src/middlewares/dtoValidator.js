const Joi = require("joi");
const schemas = require("../schemas/validation");

const validate = (req, res, next) => {
    const path = req.route.path;
    const schemaKey = path.replace("/", "");

    const schema = schemas[schemaKey];

    if (!schema) {
        return res.status(400).send({ message: "Bir hata oluştu." });
    }

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send({ message: "Bir hata oluştu." });
    }

    next();
};

module.exports = validate;
