import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const uploadToCloudinary = async (file) => {
  return await new Promise((resolve, reject) => {
    const uploadResult = cloudinary.uploader.upload_stream(
      {
        public_id: file.originalname,
        folder: 'prime-emirates',
        overwrite: true,
      },
      (error, uploadResult) => {
        if (error) {
          return reject(error);
        }
        return resolve(uploadResult);
      }
    );
    uploadResult.end(file.buffer);
  });
};
