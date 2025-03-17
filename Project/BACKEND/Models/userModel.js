import { Schema } from "mongoose";
import { model } from "mongoose";

const userSchema = new Schema({
    firstName : { type: String, required: true },
    lastName : { type: String, required: true },
    email : { type: String, required: true, unique: true },
    password : { type: String, required: true },
    userRole: { type: String, required: true },
})

const User = new model('User', userSchema);

const profileSchema = new Schema({
    image: { type: String, required: true },
    date:{type:String,required:true,unique:true},
    age: { type: String, required: true },
    gender: { type: String, required: true },
    bodyType: { type: String, required: true },
    height: { type: String, required: true },
    weight: { type: String, required: true },
   
})
const Profile = new model('Profile', profileSchema);

export  {User , Profile} ;  // export the models