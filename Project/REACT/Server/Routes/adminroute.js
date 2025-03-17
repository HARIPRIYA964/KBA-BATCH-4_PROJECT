import { Router } from "express";
import dotenv from 'dotenv'
import { Addmaintain, Addweightgain, Addweightloss } from "../Models/adminModel.js";
import authenticate from "../MiddleWare/auth.js";
import adminCheck from "../MiddleWare/adminauth.js";
import { upload } from "../MiddleWare/upload.js";
import { compressAndConvertToBase64 } from "../MiddleWare/upload.js";
import { compressAndConvert } from "../MiddleWare/upload.js";
import { compressConvert } from "../MiddleWare/upload.js";
import fs from 'fs';

dotenv.config()
const adminroute = Router();



adminroute.post('/addmaintain', authenticate, adminCheck, upload.single("maintainvideo"), async (req, res) => {
  try {
    const { day, breakfast, lunch, snacks, dinner } = req.body;
    const existingmaintain = await Addmaintain.findOne({ day: day });

    if (existingmaintain) {
      return res.status(400).json({ msg: "Day already exists" });
    } else {
      if (req.file) {
        // Compress the video and convert it to Base64
        compressAndConvertToBase64(req.file.path, (err, videoBase64) => {
          if (err) {
            return res.status(500).json({ msg: 'Error compressing and converting video', error: err });
          }

          // Save the new document with the Base64 video
          const newMaintain = new Addmaintain({
            day: day,
            breakfast: breakfast,
            lunch: lunch,
            snacks: snacks,
            dinner: dinner,
            video: videoBase64,  // Store compressed Base64 video
          });

          newMaintain.save()
            res.status(201).json({ message: `${day} stored successfully` })
           
        });
      } else {
        res.status(400).json({ msg: "No video file provided" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server error');
  }
});


adminroute.post('/addweightloss', authenticate, adminCheck, upload.single("weightlossvideo"), async (req, res) => {
  try {
    const { Day, Breakfast, Lunch, Snacks, Dinner } = req.body;
    const existingweightloss = await Addweightloss.findOne({ Day: Day });

    if (existingweightloss) {
      return res.status(400).json({ msg: "Day already exists" });
    } else {
      if (req.file) {
        // Compress the video and convert it to Base64
        compressAndConvert(req.file.path, (err, VideoBase64) => {
          if (err) {
            return res.status(500).json({ msg: 'Error compressing and converting video', error: err });
          }

          // Save the new document with the Base64 video
          const newWeightloss = new Addweightloss({
            Day: Day,
            Breakfast: Breakfast,
            Lunch: Lunch,
            Snacks: Snacks,
            Dinner: Dinner,
            Video: VideoBase64,  // Store compressed Base64 video
          });

           newWeightloss.save()
            res.status(201).json({ message: `${Day} stored successfully` })
           
        });
      } else {
        res.status(400).json({ msg: "No video file provided" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server error');
  }
});


adminroute.post('/addweightgain', authenticate, adminCheck, upload.single("weightgainvideo"), async (req, res) => {
  try {
    const { DAY, BREAKFAST, LUNCH, SNACKS, DINNER } = req.body;
    const existingweightgain = await Addweightgain.findOne({ DAY: DAY });

    if (existingweightgain) {
      return res.status(400).json({ msg: "Day already exists" });
    } else {
      if (req.file) {
        // Compress the video and convert it to Base64
        compressConvert(req.file.path, (err, VideoBase64) => {
          if (err) {
            return res.status(500).json({ msg: 'Error compressing and converting video', error: err });
          }

          // Save the new document with the Base64 video
          const newWeightgain = new Addweightgain({
            DAY: DAY,
            BREAKFAST: BREAKFAST,
            LUNCH: LUNCH,
            SNACKS: SNACKS,
            DINNER: DINNER,
            VIDEO: VideoBase64,  // Store compressed Base64 video
          });

          newWeightgain.save()
            res.status(201).json({ message: `${DAY} stored successfully` })
           
        });
      } else {
        res.status(400).json({ msg: "No video file provided" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server error');
  }
});


adminroute.get('/viewmaintain',authenticate,async(req,res)=>{
  try {
    const maintains = await Addmaintain.find();
    console.log(maintains)
    if (!Array.isArray(maintains)) {
      return res.status(500).json({ error: 'Data is not in array format' });
    }
    res.json(maintains); 
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});


adminroute.get('/viewweightloss',authenticate,async(req,res)=>{
  try {
    const weightloss = await Addweightloss.find();
  
    if (!Array.isArray(weightloss)) {
      return res.status(500).json({ error: 'Data is not in array format' });
    }
    res.json(weightloss); 
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

adminroute.get('/viewweightgain',authenticate,async(req,res)=>{
  try {
    const weightgain = await Addweightgain.find();
  
    if (!Array.isArray(weightgain)) {
      return res.status(500).json({ error: 'Data is not in array format' });
    }
    res.json(weightgain); 
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

adminroute.put('/updatemaintain', authenticate, adminCheck, upload.single("maintainvideo"), async (req, res) => {
  try {
    const { day, breakfast, lunch, snacks, dinner } = req.body;
    const result = await Addmaintain.findOne({ day: day });

    if (!result) {
      return res.status(404).json({ message: "Data not found" });
    }

    result.breakfast = breakfast;
    result.lunch = lunch;
    result.snacks = snacks;
    result.dinner = dinner;

    // If a new video is uploaded, process it
    if (req.file) {
      compressAndConvertToBase64(req.file.path, async (err, base64Video) => {
        if (err) {
          return res.status(500).json({ error: "Error processing video" });
        }

        result.video = base64Video; // Save Base64 string in DB
        await result.save();

        // Remove the original uploaded file after processing
        fs.unlinkSync(req.file.path);

        res.json({ message: "Data updated successfully with video" });
      });
    } else {
      await result.save();
      res.json({ message: "Data updated successfully" });
    }

  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

adminroute.put('/updateweightgain', authenticate, adminCheck, upload.single("weightgainvideo"), async (req, res) => {
  try {
    const { DAY, BREAKFAST, LUNCH, SNACKS, DINNER,VIDEO } = req.body;
    const result = await Addweightgain.findOne({ DAY: DAY });

    if (!result) {
      return res.status(404).json({ message: "Data not found" });
    }

    result.BREAKFAST = BREAKFAST;
    result.LUNCH = LUNCH; 
    result.SNACKS = SNACKS;
    result.DINNER = DINNER;

    // If a new video is uploaded, process it
    if (req.file) {
      compressConvert(req.file.path, async (err, base64Video) => {
        if (err) {
          return res.status(500).json({ error: "Error processing video" });
        }

        result.VIDEO = base64Video; // Save Base64 string in DB
        await result.save();

        // Remove the original uploaded file after processing
        fs.unlinkSync(req.file.path);

        res.json({ message: "Data updated successfully with video" });
      });
    } else {
      await result.save();
      res.json({ message: "Data updated successfully" });
    }

  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});


adminroute.put('/updateweightloss', authenticate, adminCheck, upload.single("weightlossvideo"), async (req, res) => {
  try {
    const { Day, Breakfast, Lunch, Snacks, Dinner } = req.body;
    const result = await Addweightloss.findOne({ Day : Day });

    if (!result) {
      return res.status(404).json({ message: "Data not found" });
    }

    result.Breakfast = Breakfast;
    result.Lunch = Lunch;
    result.Snacks = Snacks;
    result.Dinner = Dinner;

    // If a new video is uploaded, process it
    if (req.file) {
      compressAndConvert(req.file.path, async (err, base64Video) => {
        if (err) {
          return res.status(500).json({ error: "Error processing video" });
        }

        result.Video = base64Video; // Save Base64 string in DB
        await result.save();

        // Remove the original uploaded file after processing
        fs.unlinkSync(req.file.path);

        res.json({ message: "Data updated successfully with video" });
      });
    } else {
      await result.save();
      res.json({ message: "Data updated successfully" });
    }

  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});
export {adminroute}
