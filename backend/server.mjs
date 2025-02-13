import dotenv from "dotenv";
dotenv.config();
import express from "express";

import connectdb from "./config/db.js";

import cors from "cors";

import authrouter from "./routes/auth.js"; //singup/login
import passrouter from "./routes/password.js";

connectdb();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/auth", authrouter); //sign. login
app.use("/api", passrouter); //passwords

app.get("/ping", (req, res) => {
  res.send("PONG");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
