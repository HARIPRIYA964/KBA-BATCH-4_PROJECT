import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../Models/userModel.js";


dotenv.config();

const userroute = Router()

userroute.post('/signup',async(req,res)=>{
    try {
        const {FirstName,LastName,Email,Password,UserRole} = req.body;
        const existinguser = await User.findOne({email:Email});
        if(existinguser){
            return res.status(400).json({message:"User already exists"});
            }
            else{
                const hashedpassword = await bcrypt.hash(Password,10);
                const newuser = new User({
                    firstName:FirstName,
                    lastName:LastName,
                    email:Email,
                    password:hashedpassword,
                    userRole:UserRole   
                    });
                    await newuser.save();
                    res.status(201).json({message:"User Signup successfully"});
            }
            } catch (error) {
                res.status(500).json({message:"Internal Server Error"});
                }

})

userroute.post('/login',async(req,res)=>{
    try {
        const {Email,Password} = req.body;
        const result = await User.findOne({email:Email});
        if(!result){
            return res.status(400).json({message:"User does not exist"});
            }
            else{
                const ismatch = await bcrypt.compare(Password,result.password);
                if(ismatch){   
                    const token = jwt.sign({email:Email,userRole:result.userRole},process.env.SECRET_KEY,{expiresIn:'1h'})
                    res.cookie('Token',token,{
                        httpOnly:true,
                    })
                    res.status(200).json({message:"User Login successfully"});
                    }
                    else{
                        return res.status(400).json({message:"Invalid Password"});
                        }   
                        }
                        } catch (error) {
                            res.status(500).json({message:"Internal Server Error"});
                            console.log(error)
                            }

})

userroute.get('/logout',(req,res)=>{
    res.clearCookie('Token');
    res.status(200).json({message:"User Logout successfully"});
})

export {userroute}