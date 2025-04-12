const Joi = require("joi");
const schemas = require("../schemas/validation");
const {
    generateMessage,
    messageSchema,
} = require("../services/messageService");

const validate = (req, res, next) => {
    const path = req.route.path;
    const schemaKey = path.replace("/", "");

    const schema = schemas[schemaKey];

    if (!schema) {
        return res
            .status(400)
            .send({ message: generateMessage(messageSchema.unknownError) });
    }

    const { error } = schema.validate(req.body);

    if (error) {
        console.log(error);
        return res
            .status(400)
            .send({ message: generateMessage(messageSchema.unknownError) });
    }

    next();
};

module.exports = validate;
