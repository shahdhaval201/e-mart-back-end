const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const { errorHandler, notFound } = require("./middleware/errorHandler");
const app = express();
const authRouter = require("./routes/authRoutes");
const dotenv = require("dotenv").config();
const PORT = 5000;

dbConnect()

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/user",authRouter)

app.use(notFound);
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



