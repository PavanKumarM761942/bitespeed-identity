import express from "express";
import cors from "cors";
import identifyRoutes from "./routes/identify.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/identify", identifyRoutes);

app.use(errorMiddleware);

export default app;