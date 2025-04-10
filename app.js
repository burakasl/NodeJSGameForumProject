const prisma = require("./src/prisma");
const express = require("express");
const app = express();
const routes = require("./src/controllers/router");

const port = process.env.PORT;

app.use(express.json());
app.use(routes);

app.listen(port);
