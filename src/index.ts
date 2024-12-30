import dotenv from "dotenv";
dotenv.config(); // important use dotenv before imports your own modules
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { uploadRouter } from "./routes/upload";
import errorHandler from "./middlewares/errorHandler";
import { logger } from "./lib/winston";

const prisma = new PrismaClient().$extends(withAccelerate());

async function main() {
  try {
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
      logger.info(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error(`Error: ${error.message}\nStack: ${error.stack}`);
    }
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    logger.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
