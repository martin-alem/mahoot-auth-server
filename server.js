import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import linkedinRouter from "./routes/linkedInLoginRoute.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/v1/", linkedinRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("listening on port: " + PORT);
});
