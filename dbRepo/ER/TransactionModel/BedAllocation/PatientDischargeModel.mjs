import mongoose from "mongoose";

const PatientDischarge = new mongoose.Schema({
  erNo: { type: Number, required: true },
  mrNo: { type: String, required: true },
  patientName: { type: String, required: true },
  gender: { type: String, required: true },
  partyCode: { type: String, required: true },
  dutyDoctor: { type: String, required: true },
  dutyStaff: { type: String, required: true },
  dischargeCondition: { type: String, required: true },
  symptoms: { type: String, required: true },
  remarks: { type: String },
  dischargeAt: { type: Date, default: Date.now },
});
export const PatientDischargeModel = mongoose.model(
  "PatientDischarge",
  PatientDischarge
);
