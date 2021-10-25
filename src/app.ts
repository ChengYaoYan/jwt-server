import express from "express";
import register from "./routes/register";

const app = express();

app.use(express.json());

app.post("/register", register);

app.listen(5005, () => console.log("Server started on port 5005."));
