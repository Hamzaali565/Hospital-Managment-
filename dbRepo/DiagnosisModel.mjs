import mongoose from "mongoose";
const Diagnosis = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  status: { type: Boolean, required: true },
});
export const DiagnosisModel = mongoose.model("Diagnosis", Diagnosis);
