const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
// Routes path
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middlewares/errorMiddleware");

// dotenv
dotenv.config();

// mongo connection
connectDB();

// rest object
const app = express();

var corsOptions = {
  origin: "*",
};

//middlewares
app.use(cors("https://kraftysoul-ai.onrender.com"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

// API routes
app.use("/api/v1/auth", authRoutes);
app.use('/api/v1/openai', require("./routes/openaiRoutes"));
// app.use("/api/v1/huggingFace", require("./routes/huggingFaceRoutes"));

// listen server
app.listen(8080, () => {
  console.log(
    `Server Running in ${process.env.DEV_MODE} on ${process.env.PORT}`.bgCyan
      .white
  );
});
