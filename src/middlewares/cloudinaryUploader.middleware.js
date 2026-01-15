import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import path from "path";
import cloudinary from "../config/cloudinary.js";

const cloudinaryUploadMiddleware = ({
  folder = "uploads",
  maxSize = 5 * 1024 * 1024,
  allowedFormats = ["jpg", "jpeg", "png", "webp"],
  transformations = [],
} = {}) => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: (req, file) => {
      const ext = path.extname(file.originalname).slice(1);

      if (!allowedFormats.includes(ext)) {
        throw new Error("Invalid file format");
      }

      return {
        folder,
        public_id: `${file.fieldname}-${Date.now()}`,
        format: ext,
        transformation: transformations,
      };
    },
  });

  return multer({
    storage,
    limits: { fileSize: maxSize },
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.startsWith("image/")) {
        return cb(new Error("Only image files are allowed"));
      }
      cb(null, true);
    },
  });
};

export default cloudinaryUploadMiddleware;
