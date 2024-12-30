import dotenv from "dotenv";
dotenv.config(); // important use dotenv before imports your own modules
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { uploadRouter } from "./routes/upload";
import errorHandler from "./middlewares/errorHandler";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api/upload", uploadRouter);
app.use(errorHandler); // error middleware has to be the last middleware

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
