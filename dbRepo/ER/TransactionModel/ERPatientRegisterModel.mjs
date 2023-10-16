import mongoose from "mongoose";

const ERPatientRegister = new mongoose.Schema({
  patientName: { type: String, required: true },
  fatherName: { type: String, required: true },
  gender: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  cell: { type: String, required: true },
  address: { type: String, required: true },
  dateOfBirth: { type: String },
  age: { type: String, required: true },
  occupation: { type: String },
  email: { type: String },
  mrNo: { type: Number, default: 0 },
  religion: { type: String, required: true },
  city: { type: String, required: true },
  passport: { type: String },
  cnic: { type: String },
  area: { type: String, required: true },
  nationality: { type: String, required: true },
  kinName: { type: String, required: true },
  kinRelation: { type: String, required: true },
  kinOccupation: { type: String },
  kinAddress: { type: String, required: true },
  kinCNIC: { type: String },
  kinPassport: { type: String },
  kinCell: { type: String, required: true },
});

export const ERPatientRegisterModel = mongoose.model(
  "ERPatientRegister",
  ERPatientRegister
);
