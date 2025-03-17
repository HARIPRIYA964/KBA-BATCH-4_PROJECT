import multer from "multer";
import path from "path";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

// Configure storage engine for Multer (store file temporarily)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // Store temporarily in 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname)); // Unique filename using UUID
  }
});

// File filter to only allow video files
const fileFilter = (req, file, cb) => {
  const allowedTypes = /mp4|avi|mkv/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);  // Accept file
  } else {
    cb(new Error('Error: Only video files are allowed!'), false);
  }
};

// Initialize multer with disk storage
const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 },  // File size limit (e.g., 100MB)
  fileFilter: fileFilter
});

// Compress the video using FFmpeg and convert to Base64
//Weight Maintain

const compressAndConvertToBase64 = (filePath, callback) => {
  const outputPath = `uploads/maintainvideo-${path.basename(filePath)}`;
  
  ffmpeg(filePath)
    .output(outputPath)
    .videoCodec('libx264')
    .size('640x360')
    .on('end', () => {
      console.log('Video compression completed');
      // Read compressed video file and convert it to Base64
      fs.readFile(outputPath, (err, data) => {
        if (err) {
          console.error('Error reading compressed file:', err);
          return callback(err);
        }
        const base64String = data.toString('base64');
        // Clean up the temporary compressed file
        fs.unlinkSync(outputPath);
        callback(null, base64String);
      });
    })
    .on('error', (err) => {
      console.error('Error during FFmpeg process:', err);
      callback(err);
    })
    .run();
};

//Weight Loss

const compressAndConvert = (filePath, callback) => {
  const outputPath = `uploads/weightlossvideo-${path.basename(filePath)}`;
  
  ffmpeg(filePath)
    .output(outputPath)
    .videoCodec('libx264')
    .size('640x360')
    .on('end', () => {
      console.log('Video compression completed');
      // Read compressed video file and convert it to Base64
      fs.readFile(outputPath, (err, data) => {
        if (err) {
          console.error('Error reading compressed file:', err);
          return callback(err);
        }
        const base64String = data.toString('base64');
        // Clean up the temporary compressed file
        fs.unlinkSync(outputPath);
        callback(null, base64String);
      });
    })
    .on('error', (err) => {
      console.error('Error during FFmpeg process:', err);
      callback(err);
    })
    .run();
};


const compressConvert = (filePath, callback) => {
  const outputPath = `uploads/weightgainvideo-${path.basename(filePath)}`;
  
  ffmpeg(filePath)
    .output(outputPath)
    .videoCodec('libx264')
    .size('640x360')
    .on('end', () => {
      console.log('Video compression completed');
      // Read compressed video file and convert it to Base64
      fs.readFile(outputPath, (err, data) => {
        if (err) {
          console.error('Error reading compressed file:', err);
          return callback(err);
        }
        const base64String = data.toString('base64');
        // Clean up the temporary compressed file
        fs.unlinkSync(outputPath);
        callback(null, base64String);
      });
    })
    .on('error', (err) => {
      console.error('Error during FFmpeg process:', err);
      callback(err);
    })
    .run();
};



export { upload, compressAndConvertToBase64,compressAndConvert,compressConvert };
