import { Router } from "express";
import { upload } from "../services/multer";
import UploadController from "../controllers/upload";

const router = Router();

router.post("/image", upload.single("files"), UploadController.uploadImage);

export { router as uploadRouter };
