import mongoose from "mongoose";

const ERBill = new mongoose.Schema({
  erNo: { type: String, required: true },
  consultant: { type: String },
  patientName: { type: String, required: true },
  gender: { type: String, required: true },
  mrNo: { type: String },
  ward: { type: String, required: true },
  bedNo: { type: String, required: true },
  party: { type: String, required: true },
  discharged: { type: Boolean, required: false },
  dischargedAt: { type: Date, default: Date.now },
});

export const ERBillModel = mongoose.model("ERBill", ERBill);
