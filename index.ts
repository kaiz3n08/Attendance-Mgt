import express from "express";
import "dotenv/config";
import { teachersRoute } from "./src/routes/TeachersRoutes";
import { studentRoute } from "./src/routes/StudentRoute";

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use("/teacher", teachersRoute);
app.use("/student", studentRoute);

app.listen(port, () => console.log(`Server listening on ${port}`));
