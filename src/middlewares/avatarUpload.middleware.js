import cloudinaryUploadMiddleware from "./cloudinaryUploader.middleware";
const avatarUploader = cloudinaryUploadMiddleware({
  folder: "avatars",
  maxSize: 5 * 1024 * 1024,
  allowedFormats: ["jpg", "jpeg", "png", "webp"],
  transformations: [
    { width: 300, height: 300, crop: "fill", gravity: "face" },
    { quality: "auto" },
  ],
});
export default avatarUploader;
