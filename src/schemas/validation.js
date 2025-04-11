const Joi = require("joi");

const validationSchemas = {};

validationSchemas.login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

validationSchemas.register = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8)
        .max(20)
        .regex(/[a-z]/)
        .regex(/[A-Z]/)
        .regex(/[0-9]/)
        .required(),
});

validationSchemas.createReview = Joi.object({
    movieId: Joi.string().required(),
    title: Joi.string().max(30).required(),
    content: Joi.string().max(1000).required(),
    score: Joi.number().precision(1).min(0).max(10).required(),
    statusId: Joi.string().required(),
});

validationSchemas.createAdminAccount = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8)
        .max(20)
        .regex(/[a-z]/)
        .regex(/[A-Z]/)
        .regex(/[0-9]/)
        .required(),
});

validationSchemas.createGame = Joi.object({
    name: Joi.string().required(),
    releaseDate: Joi.date().required(),
    description: Joi.string().min(30).max(100).required(),
    score: Joi.number().precision(1).min(0).max(10).required(),
    imageUrl: Joi.string().required(),
});

module.exports = validationSchemas;
