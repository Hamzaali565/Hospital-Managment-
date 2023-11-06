import mongoose from "mongoose";

const PatientVitals = new mongoose.Schema({
  erNo: { type: String, required: true },
  consultant: { type: String },
  patientName: { type: String, required: true },
  gender: { type: String, required: true },
  mrNo: { type: String, required: true },
  ward: { type: String, required: true },
  bedNo: { type: String, required: true },
  party: { type: String, required: true },
  vitals: [
    {
      vitalsName: { type: String },
      vitalsValue: { type: String },
      vitalsTime: { type: Date, default: Date.now },
    },
  ],
});
export const PatientVitalsModel = mongoose.model(
  "PatientVitals",
  PatientVitals
);

// {erNo, consultant, patientName, gender, mrNo, ward, bedNo, party, vitals}
