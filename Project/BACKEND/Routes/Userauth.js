import { Router } from "express";
import authenticate from "../MiddleWare/auth.js";
import dotenv from 'dotenv';
import { Profile } from "../Models/userModel.js";
import { upload } from "../MiddleWare/upload.js";


dotenv.config()
const userauth = Router();

const convertBase64 = (Buffer)=>{
    return Buffer.toString('base64')
  }

userauth.post('/addprofile',authenticate,upload.single('profileImage'),async(req,res)=>{
    try {
        if(req.userRole == 'User'){
        const {Date,Age,Gender,BodyType,Weight,Height} = req.body;
        const exisitingProfile = await Profile.findOne({date:Date})
        if(exisitingProfile){
            return res.status(400).json({message:"Date already exists"})
            }
            else{
               let imageBase64 = null;
        if(req.file){
          imageBase64 = convertBase64(req.file.buffer)
          }
        
                    const newProfile = new Profile({
                        image:imageBase64,
                        date:Date,
                        age:Age,
                        gender:Gender,
                        bodyType:BodyType,
                        weight:Weight,
                        height:Height
                      
                        })
                        await newProfile.save()
                        
                        res.status(201).json({message:`Profile successfully added`,data:newProfile})
                        
                    }
                    }
                    else{
                        return res.status(403).json({message:"You are not authorized to perform this action"})
                        }
                        } catch (error) {
                            res.status(500).json({message:error.message})
                         }

})

userauth.get('/getprofile',async(req,res)=>{
    try {
        const search = req.query.Date
        const profile = await Profile.findOne({date:search})
        if(profile){
            const  imageBuffer = Buffer.from(profile.image,"base64")
            // res.set({
            //     "Content-Type":"image/jpg",
            //     "Content-Disposition":"attachment; filename=profile.jpg"
            //   })
              console.log(profile);
              return res.status(200).json({message: "Profile is found",profile});   
              
                    // res.status(200).send(imageBuffer);
     
                }
              else{
                return res.status(404).json({message:"Profile not avaliable"})
                }
                } catch (error) {
                    res.status(500).json({message:error.message})
                    }
                    })
                    


export {userauth}