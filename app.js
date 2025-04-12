const prisma = require("./prisma");
const express = require("express");
const app = express();
const routes = require("./controllers/router");
const { generateMessage, messageSchema } = require("./services/messageService");

const port = process.env.PORT;

app.use(express.json());
app.use(routes);

app.use((error, req, res, next) => {
    console.log(error);
    return res
        .status(400)
        .send({ message: generateMessage(messageSchema.unknownError) });
});

app.listen(port);
