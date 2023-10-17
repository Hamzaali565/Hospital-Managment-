import mongoose from "mongoose";

const FrontReg = new mongoose.Schema({
  erRegNo: { type: Number, default: 0 },
  partyCode: { type: String, required: true },
  corporateNo: { type: String, required: true },
  mrNo: { type: Number },
  wardType: { type: String, required: true },
  bedNo: { type: String, required: true },
  patientName: { type: String, required: true },
  age: { type: String },
  cellNo: { type: String, required: true },
  address: { type: String },
  gender: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  dateBirth: { type: String, required: true },
});
export const FrontRegModel = mongoose.model("FrontReg", FrontReg);
