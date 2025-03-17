import { Router } from "express";
import authenticate from "../MiddleWare/auth.js";
import dotenv from 'dotenv';
import { Profile } from "../Models/userModel.js";
import { Imageupload } from "../MiddleWare/Imageupload.js";
import { compressAndConvertToBase64 } from "../MiddleWare/Imageupload.js";



dotenv.config();
const userauth = Router();

userauth.put('/addprofile', authenticate, async (req, res) => {
  try {
      const { date, age, gender, weight, height } = req.body;
      console.log("Received:", date, age, gender, weight, height);

      let profile = await Profile.findOne({ userId: req.user_id });

      if (!profile) {
          profile = new Profile({
              userId: req.user_id,
              updates: []
          });
      }

      // Convert height to inches
      const heightInInches = height / 2.54;
      let ibw = gender === 'male' ? (50 + 2.3 * (heightInInches - 60)) : (45.5 + 2.3 * (heightInInches - 60));
      let suggestion = (weight >= 0.9 * ibw && weight <= 1.1 * ibw) ? "maintain" : (weight < 0.9 * ibw ? "gain" : "lose");

      // Format received date (only YYYY-MM-DD)
      const formattedDate = new Date(date).toISOString().split('T')[0];

      // Check last update date
      if (profile.updates.length > 0) {
          const lastUpdate = profile.updates[profile.updates.length - 1];
          const lastUpdateDate = new Date(lastUpdate.date);
          const nextAllowedDate = new Date(lastUpdateDate);
          nextAllowedDate.setDate(nextAllowedDate.getDate() + 7); // Add 7 days

          const receivedDate = new Date(formattedDate);

          if (receivedDate.getTime() !== nextAllowedDate.getTime()) {
              return res.status(400).json({ 
                  message: `You can only add an update every 7 days. Next allowed date: ${nextAllowedDate.toISOString().split('T')[0]}` 
              });
          }
      }

      // Add new update
      profile.updates.push({ date: formattedDate, age, gender, weight, height });

      await profile.save();

      res.status(200).json({ 
          message: "Profile updated successfully.", 
          profileFilled: true, 
          suggestion 
      });

  } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});
userauth.get('/getprofile', authenticate, async (req, res) => {
  try {
      const data = await Profile.find({ userId: req.user_id }).sort({ date: -1 });

      console.log("Profile Data:", data); // Debugging

      if (!data || data.length === 0) {
          return res.status(404).json([]);
      }

      res.status(200).json(data);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});


userauth.put('/addImage', authenticate, Imageupload.single('ProfileImage'), async (req, res) => {
    try {
      const image = req.file;
      const existingProfile = await Profile.findOne({ userId: req.user_id });
  
      if (existingProfile) {
        return res.status(404).json({ message: "Profile already exists" });
            } else {
              const imageBase64 = await compressAndConvertToBase64(image.path);
              await Profile.updateOne(
                { userId: req.user_id },
                { $set: { ProfileImage: imageBase64 } }
            );
    
          
        res.status(200).json({ message: "Image uploaded successfully" });
      }
  
      res.status(200).json({ message: "Profile image added successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
export { userauth };