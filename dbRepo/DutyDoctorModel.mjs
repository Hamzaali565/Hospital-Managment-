import mongoose from "mongoose";

const dutyDoctor = new mongoose.Schema({
  doctorCode: { type: Number, required: true },
  doctorName: { type: String, required: true },
});
export const dutyDoctorModel = mongoose.model("dutyDoctor", dutyDoctor);
