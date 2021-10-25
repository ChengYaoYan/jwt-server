import express from "express";
import cors from "cors";
import register from "./routes/register";
import login from "./routes/login";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", register);
app.post("/login", login);

app.listen(5005, () => console.log("Server started on port 5005."));
