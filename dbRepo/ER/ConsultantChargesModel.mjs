import mongoose from "mongoose";

const ConsultantCharges = new mongoose.Schema({
  partyName: { type: String, required: true },
  consultantName: { type: String, required: true },
  ratesData: [
    {
      consultantCode: { type: String },
      consultantName: { type: String },
      rate: { type: String },
      hospitalSharePercent: { type: String },
      hospitalShareRuppees: { type: String },
      status: { type: Boolean, default: true },
    },
  ],
});

export const ConsultantChargesModel = mongoose.model(
  "ConsultantCharges",
  ConsultantCharges
);
