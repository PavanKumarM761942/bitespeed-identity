import express from "express";
import cors from "cors";
import identifyRoutes from "./routes/identify.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Root Route
app.get("/", (req, res) => {
  res.status(200).send("Bitespeed API Running 🚀");
});

// ✅ Identify Route
app.use("/identify", identifyRoutes);

// ✅ Global Error Handler
app.use(errorMiddleware);

export default app;