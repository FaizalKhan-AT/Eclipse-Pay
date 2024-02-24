const express = require("express");
const compression = require("compression");
const app = express();
const cors = require("cors");
const { connectDB } = require("./database");
const HandleError = require("./middlewares/ErrorHandler");
const { AuthRoutes } = require("./routes");
require("dotenv").config();
//middlewares
app.use(compression());
app.use(express.json());
app.use(cors());
// Routes
app.use("/api/v1/auth", AuthRoutes);
// Custom Errors
app.use(HandleError.customErrorHandler);
// server
const startServer = () => {
  try {
    connectDB();
    app.listen(
      process.env.PORT,
      console.log(`server and database started running at ${process.env.PORT} `)
    );
  } catch (err) {
    console.error(err);
  }
};
startServer();
