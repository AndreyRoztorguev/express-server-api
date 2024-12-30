import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

class UploadController {
  async uploadImage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.file) {
        throw createHttpError(404, "No file uploaded.");
      }
      res.json({ message: "Upload successful!" });
    } catch (error: unknown) {
      next(error);
    }
  }
}

export default new UploadController();
