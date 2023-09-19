import mongoose from "mongoose";

const consultant = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  speciality: { type: String, required: true },
  pmdc: { type: String },
  address: { type: String },
  email: { type: String },
  cnic: { type: String, required: true },
  phone: { type: String },
  status: { type: Boolean, default: false },
});
export const ConsultantsModel = mongoose.model("consultants", consultant);
