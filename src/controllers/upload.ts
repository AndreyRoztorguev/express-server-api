import { Request, Response } from "express";

class UploadController {
  async uploadImage(req: Request, res: Response): Promise<void> {
    try {
      if (!req.file) {
        res.status(404).json({ error: "No file uploaded." });
        return;
      }
      res.json({ message: "Upload successful!" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Unknown error occurred." });
      }
    }
  }
}

export default new UploadController();
