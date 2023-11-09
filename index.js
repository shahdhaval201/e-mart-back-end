const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const authRouter = require("./routes/authRoutes");
// const dotenv = require("dotenv").config();
const PORT = 4000;

dbConnect()

app.use("/", (req, res) => { res.send("Hello World from server side") });

app.use("/api/user",authRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



