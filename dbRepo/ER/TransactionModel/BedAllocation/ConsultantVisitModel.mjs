import mongoose from "mongoose";

const consultantVisit = new mongoose.Schema({
  erNo: { type: String, required: true },
  mrNo: { type: String, required: true },
  patientName: { type: String, required: true },
  gender: { type: String, required: true },
  partyCode: { type: String, required: true },
  consultantVisit: [
    {
      consultantName: { type: String },
      charges: { type: Number },
    },
  ],
});
export const consultantVisitModel = mongoose.model(
  "consultantVisit",
  consultantVisit
);
