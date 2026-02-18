import express from "express";
import "dotenv/config";
import { teachersRoute } from "./src/routes/TeachersRoutes";

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use("/teacher", teachersRoute);

app.listen(port, () => console.log(`Server listening on ${port}`));
