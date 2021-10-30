import express from "express";
import cors from "cors";
import register from "./routes/register";
import login from "./routes/login";
import users from "./routes/users";
import projects from "./routes/projects";
import { verifyToken } from "./lib/helper";

// const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", register);
app.post("/login", login);
app.get("/users", verifyToken, users);
app.get("/projects", verifyToken, projects);

app.listen(5000, () => console.log("Server started on port 5000."));
