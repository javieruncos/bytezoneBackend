import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
 params: async (req, file) => ({
    folder: "uploads",
    public_id: `${Date.now()}-${file.originalname}`,
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  }),
})

export const upload = multer({storage})