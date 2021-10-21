import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectToSmackDatabase } from "./database/connection.js";
import linkedinRouter from "./routes/linkedInLoginRoute.js";
import githubRouter from "./routes/githubLoginRoute.js";

dotenv.config();

//connect to smack database
connectToSmackDatabase();

const app = express();

var corsOptions = {
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1/linkedin/", linkedinRouter);
app.use("/api/v1/github/", githubRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("listening on port: " + PORT);
});
