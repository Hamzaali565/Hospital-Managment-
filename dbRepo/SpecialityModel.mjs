import mongoose from "mongoose";

const Speciality = new mongoose.Schema({
  code: { type: String, required: true },
  description: { type: String, required: true },
});
export const SpecialityModel = mongoose.model("Speciality", Speciality);
