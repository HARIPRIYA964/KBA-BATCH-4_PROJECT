import { Schema } from "mongoose";
import { model } from "mongoose";

const userSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
      password: { type: String, required: true },  
      email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Please fill a valid email address']
    },      
    userType: { default:'user', type: String ,required:true}
    
    });
    const User = new model("User", userSchema);
  


    const profileSchema = new Schema({
      userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      firstname: { type: String, required: true },  
      lastname: { type: String, required: true },   
      email: { type: String, required: true, unique: true },
      ProfileImage: String,
      updates: [  // Store multiple entries for tracking progress
          {
              date: { type: Date, required: true },
              age: { type: Number, required: true },
              gender: { type: String, required: true },
              height: { type: Number, required: true },
              weight: { type: Number, required: true }
          }
      ]
  });
const Profile =  model('Profile', profileSchema);





export  {User , Profile } ;  // export the models