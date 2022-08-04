const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, "./public");
const connectDB = require("./mongoconnection");
const router = require("./routes/route");
require("dotenv").config();
const notFound = require("./middlewares/notFound");
const errorHandlerMiddleware = require("./middlewares/errorHandler");

//midlewares
app.use(express.json());
app.use(express.static(publicDir));

//routes
app.use("/api/v1/tasks", router);
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`server is listening on ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
