const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 3000;
const cors = require("cors");
// const swaggerUi = require('swagger-ui-express');
// const swaggerFile = require('./swagger_output.json');
const cookieParser = require("cookie-parser");
// const cookieParser = require('cookie-parser');
const formattedResponse = require("./src/utils/formatted-response");
require("dotenv").config();
const connectDB = require("./config/db");
connectDB();
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(
//   cors({
//     origin: ["https://tarasha-demo.onrender.com", "http://127.0.0.1:5173"],
//     methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
//   })
// );
const corsOptions = {
  origin: true,
  methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, x-csrf-token"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

// app.use(cors(corsOptions));

// Ensure your server handles preflight requests
// app.options("*", cors(corsOptions));

app.use(
  "/api/user",
  formattedResponse,
  require("./src/user/routes/user.authorizationroutes")
);
app.use(
  "/api/calendar",
  formattedResponse,
  require("./src/calendar/routes/calendar")
);
app.use("/api/blogs", require("./src/blog/routes/blogs.routes"));
module.exports = app;
