import express from "express";
import "dotenv/config";
import { loginRoute } from "./routes/TeachersLogin";

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use("/teacher", loginRoute);


app.listen(port, () => console.log(`Server listening on ${port}`));
