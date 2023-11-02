import mongoose from "mongoose";

const SOD = new mongoose.Schema({
  erNo: { type: String, required: true },
  consultant: { type: String },
  patientName: { type: String, required: true },
  gender: { type: String, required: true },
  mrNo: { type: String, required: true },
  ward: { type: String, required: true },
  party: { type: String, required: true },
  initialDiagnosis: { type: String, required: true },
  knownAllergies: { type: String, required: true },
  followupPlan: { type: String, required: true },
  symptoms: [
    {
      sympName: { type: String },
    },
  ],
  diagnosis: [
    {
      diagName: { type: String },
    },
  ],
});

export const SODModel = mongoose.model("SOD", SOD);
