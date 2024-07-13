import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js";
import blogRouter from "./routes/blogRouter.js";
import fileUpload from "express-fileupload";
import { fileURLToPath } from 'url';
import path from "path";

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

app.use(cors({
  origin: 'https://blog-mern-prod.onrender.com',
  methods: ["GET", "PUT", "DELETE", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// Options request handling
app.options('*', cors());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(express.static(path.join(__dirname, './client/build')))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'))
})

app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);

dbConnection();

app.use(errorMiddleware);

export default app;
