import mongoose from "mongoose";

const LabService = new mongoose.Schema({
  erNo: { type: String, required: true },
  mrNo: { type: String, required: true },
  patientName: { type: String, required: true },
  gender: { type: String, required: true },
  partyCode: { type: String, required: true },
  consultantName: { type: String, required: true },
  reqNo: { type: Number, default: 0 },
  labService: [
    {
      testName: { type: String },
      noOfTimes: { type: Number },
      charges: { type: Number },
      amount: { type: Number },
      status: { type: String, default: "Pending" },
    },
  ],
});
export const LabServiceModel = mongoose.model("LabService", LabService);
