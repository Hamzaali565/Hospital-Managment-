import mongoose from "mongoose";

const LabService = new mongoose.Schema({
  erNo: { type: String, required: true },
  mrNo: { type: String, required: true },
  patientName: { type: String, required: true },
  gender: { type: String, required: true },
  partyCode: { type: String, required: true },
  consultantName: { type: String, required: true },
  labService: [
    {
      testName: { type: String },
      noOfTimes: { type: Number },
      charges: { type: Number },
      amount: { type: Number },
    },
  ],
});
export const LabServiceModel = mongoose.model("LabService", LabService);
