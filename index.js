const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const { errorHandler, notFound } = require("./middleware/errorHandler");
const app = express();
const authRouter = require("./routes/authRoutes");
const productRouter = require("./routes/productRoutes");
const blogRouter = require("./routes/blogRoutes");
const categoryRouter = require("./routes/prodCategoryRoutes");
const blogCatRouter = require("./routes/blogCatRoutes");
const brandRouter = require("./routes/brandRoutes");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const PORT = 5000;

dbConnect();
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/category", categoryRouter);
app.use("/api/blogcategory", blogCatRouter);
app.use("/api/brand", brandRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
