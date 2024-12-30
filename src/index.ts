import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { uploadRouter } from "./routes/upload";
import errorHandler from "./middlewares/errorHandler";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api/upload", uploadRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
