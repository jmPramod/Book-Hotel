import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer memory storage (file stays in RAM)
export const uploadProfile = multer({ storage: multer.memoryStorage() });

export const uploadToCloudinary = (fileBuffer: Buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "ProfileExpenceImage",
        transformation: [
          { width: 800, height: 600, crop: "limit" },
          { quality: "auto" },
          { fetch_format: "auto" }
        ],
      },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
console.log("fileBuffer",fileBuffer);

    stream.end(fileBuffer);
  });
};
