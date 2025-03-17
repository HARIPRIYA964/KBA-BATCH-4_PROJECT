import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp"; // Image processing library

// Configure storage engine for Multer (store file temporarily)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Imageuploads/');  // Store temporarily in 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname)); // Unique filename using UUID
  }
});

// File filter to only allow image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);  // Accept file
  } else {
    cb(new Error('Error: Only image files are allowed!'), false);
  }
};

// Initialize multer with disk storage
const Imageupload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },  // File size limit (5MB)
  fileFilter: fileFilter
});

// Compress the image using Sharp and convert to Base64
const compressAndConvertToBase64 = async (filePath) => {
  try {
    const data = await sharp(filePath)
      .resize({ width: 800 }) // Resize to max width 800px
      .toFormat("jpeg")
      .jpeg({ quality: 70 }) // Adjust quality
      .toBuffer();

    const base64String = `data:image/jpeg;base64,${data.toString("base64")}`;

    //Delete the original file after processing
    fs.unlink(filePath, (err) => {
      if (err) console.error("Error deleting file:", err);
    });

    return base64String;
  } catch (err) {
    console.error("Error processing image:", err);
    throw err;
  }
};
export { Imageupload, compressAndConvertToBase64 };