import { NextFunction, Request, Response } from "express";
import { BadRequest, HttpError } from "http-errors";

class UploadController {
  async uploadImage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (req.file) {
        throw new BadRequest("No file uploaded.");
      }
      res.json({ message: "Upload successful!" });
    } catch (error: unknown) {
      if (error instanceof HttpError) {
        next(error);
      }
    }
  }
}

export default new UploadController();
