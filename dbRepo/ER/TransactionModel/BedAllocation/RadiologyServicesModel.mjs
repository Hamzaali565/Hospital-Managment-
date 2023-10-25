import mongoose from "mongoose";
const RadiologyService = new mongoose.Schema({
  erNo: { type: String, required: true },
  mrNo: { type: String, required: true },
  patientName: { type: String, required: true },
  gender: { type: String, required: true },
  partyCode: { type: String, required: true },
  radiologyService: [
    {
      testName: { type: String },
      charges: { type: Number },
      status: { type: String, default: "Pending" },
    },
  ],
});
export const RadiologyServiceModel = mongoose.model(
  "RadiologyService",
  RadiologyService
);
