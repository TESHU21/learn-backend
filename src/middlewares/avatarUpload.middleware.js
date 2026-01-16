// middlewares/avatarUploader.js
import cloudinaryUploadMiddleware from "./cloudinaryUploader.middleware.js";

/**
 * Reusable Avatar Uploader
 * - Folder: avatars
 * - Max file size: 5MB
 * - Allowed formats: jpg, jpeg, png, webp
 * - Transformations: resize to 300x300, crop to face, auto quality
 */
const avatarUploader = cloudinaryUploadMiddleware({
  folder: "avatars",
  maxSize: 5 * 1024 * 1024, // 5 MB
  allowedFormats: ["jpg", "jpeg", "png", "webp"],
  transformation: [
    { width: 300, height: 300, crop: "fill", gravity: "face" },
    { quality: "auto" },
  ],
});

export default avatarUploader;
