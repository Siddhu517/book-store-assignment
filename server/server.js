import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Routes from "./routes/Routes";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

/* routes */
app.use("/api", Routes);

/* Database Connection */

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server listening on port:${port}`));
