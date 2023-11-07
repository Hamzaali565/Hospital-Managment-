import mongoose from "mongoose";

const ConsultantNotes = new mongoose.Schema({
  erNo: { type: String, required: true },
  consultant: { type: String },
  patientName: { type: String, required: true },
  gender: { type: String, required: true },
  mrNo: { type: String, required: true },
  ward: { type: String, required: true },
  bedNo: { type: String, required: true },
  party: { type: String, required: true },
  consultantRemarks: { type: String, required: true },
  enteredBy: { type: String, required: true },
  enteredOn: { type: Date, default: Date.now },
});
export const ConsultantNotesModel = mongoose.model(
  "ConsultantNotes",
  ConsultantNotes
);
