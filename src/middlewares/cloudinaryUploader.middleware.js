import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import path from "path";
import cloudinary from "../config/cloudinary.js";

const cloudinaryUploadMiddleware = ({
  folder = "uploads",
  maxSize = 5 * 1024 * 1024,
  allowedFormats = ["jpg", "jpeg", "png", "webp"],
} = {}) => {
  // Loaded ✅

  const storage = new CloudinaryStorage({
    cloudinary,
    params: (req, file) => {
      const ext = path.extname(file.originalname).slice(1);
      return {
        folder,
        public_id: `${file.fieldname}-${Date.now()}`,
        format: ext,
      };
    },
  });

  return multer({
    storage,
    limits: { fileSize: maxSize },
    fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname).slice(1).toLowerCase();
      if (
        !file.mimetype.startsWith("image/") ||
        !allowedFormats.includes(ext)
      ) {
        return cb(
          new Error("Only image files are allowed (jpg, jpeg, png, webp)")
        );
      }
      cb(null, true);
    },
  });
};

export default cloudinaryUploadMiddleware;
