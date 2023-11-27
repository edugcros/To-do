const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dbConnect = require("./config/dbConect");
const path = require("path");
const PORT = 3000;
const authRouter = require("./routes/authRoute");
const noteRouter = require("./routes/noteRoute");

//swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerSpec = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "API Node ToDo",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        Authorization: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          value: "Bearer <JWT token here>",
        },
      },
    },
  },
  apis: [`${path.join(__dirname, "./routes/*.js")}`],
};

// middleware
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
dotenv.config();
dbConnect();
app.use(morgan("dev"));
app.use(cors());
app.use(
  "/api-doc",
  swaggerUI.serve,
  swaggerUI.setup(swaggerJsDoc(swaggerSpec))
);

//Route
app.use("/api/user", authRouter);
app.use("/api/note", noteRouter);

app.listen(PORT, () => {
  console.log(`Server is running  at PORT ${PORT}`);
  3;
});
