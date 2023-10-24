import mongoose from "mongoose";

const DischargeSummary = new mongoose.Schema({
  erNo: { type: String, required: true },
  mrNo: { type: String, required: true },
  patientName: { type: String, required: true },
  ward: { type: String, required: true },
  bedNo: { type: String, required: true },
  cheifComplaints: { type: String },
  coMortside: { type: String },
  breifSummary: { type: String },
  treatmentCourse: { type: String },
  releventInvestigation: { type: String },
  dateOfOperation: { type: String },
  procedureFinding: { type: String },
  conditionOnDischarge: { type: String },
  medicationOnDischarge: { type: String },
  instructionOnDischarge: { type: String },
  opdFollowUp: { type: String },
  followUpLabs: { type: String },
});
export const DischargeSummaryModel = mongoose.model(
  "DischargeSummary",
  DischargeSummary
);
