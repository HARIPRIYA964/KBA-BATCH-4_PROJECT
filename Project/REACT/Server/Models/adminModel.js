import { Schema } from "mongoose";
import { model } from "mongoose";

const addmaintainSchema = new Schema({
    day:{type:String,required:true,unique:true},
    breakfast:{type:String,required:true},
    lunch:{type:String,required:true},
    snacks:{type:String,required:true},
    dinner:{type:String,required:true},
    video:{type:String,required:true}
})
const Addmaintain = new model('AddMaintain',addmaintainSchema)

const addweightlossSchema = new Schema({
    Day: { type: String, required: true, unique: true },
    Breakfast:{type:String,required:true},
    Lunch: { type: String, required: true },
    Snacks: { type: String, required: true },
    Dinner: { type: String, required: true },
    Video: { type: String, required: true }
});

const Addweightloss = new model('AddWeightLoss', addweightlossSchema);

const addweightgainSchema = new Schema({
    DAY: { type: String, required: true, unique: true, trim: true },
    BREAKFAST: { type: String, required: true },
    LUNCH: { type: String, required: true },
    SNACKS: { type: String, required: true },
    DINNER: { type: String, required: true },
    VIDEO: { type: String, required: true }
});

const Addweightgain = new model('AddWeightGain', addweightgainSchema)


export {Addmaintain ,Addweightloss,Addweightgain} 