import mongoose from "mongoose";

const PartyChargesRadiology = new mongoose.Schema({
  party: { type: String, required: true },
  IPD: { type: String },
  ER: { type: String },
  parentService: { type: String, required: true },
  serviceDetail: [
    {
      serviceCode: { type: String },
      serviceName: { type: String },
      charges: { type: Number },
      status: { type: Boolean, default: true },
    },
  ],
});
export const RadiologyChargesModel = mongoose.model(
  "PartyChargesRadiology",
  PartyChargesRadiology
);
