import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectToMahootDatabase from "./database/connection.js";
import linkedinRouter from "./routes/linkedInLoginRoute.js";
import githubRouter from "./routes/githubLoginRoute.js";

dotenv.config();

//connect to smack database
connectToMahootDatabase();

const app = express();

var corsOptions = {
  origin: true,
  credentials: true,
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.enable("trust proxy");
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ status: 200, statusText: "OK", message: "Authentication server up and running" });
});

app.use("/api/v1/linkedin/", linkedinRouter);
app.use("/api/v1/github/", githubRouter);

app.all("*", (req, res) => {
  res.status(404).json({ status: 404, statusText: "fail", message: "The path you are requesting does not exist" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Authentication server listening on port: " + PORT);
});
