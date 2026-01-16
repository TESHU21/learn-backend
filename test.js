// import cloudinary from "./src/config/cloudinary";

const testUpload = async () => {
  try {
    console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
    console.log(
      "API Key:",
      process.env.CLOUDINARY_API_KEY ? "Loaded" : "Missing"
    );
    console.log("API Secret:", process.env.PORT ? "Loaded" : "Missing");

    // const result = await cloudinary.uploader.upload("test.png");
    // console.log("Upload successful:", result.url);
  } catch (err) {
    console.log("Cloudinary error:", err);
  }
};

testUpload();
