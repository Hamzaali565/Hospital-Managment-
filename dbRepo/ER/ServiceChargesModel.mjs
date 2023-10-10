import mongoose from "mongoose";
const ServiceCharges = new mongoose.Schema({
  wardName: { type: String, required: true },
  partyName: { type: String, required: true },
  parentService: { type: String, required: true },
  serviceData: [
    {
      serviceCode: { type: String },
      serviceName: { type: String },
      serviceRate: { type: String },
      serviceStatus: { type: Boolean, default: true },
    },
  ],
});
export const ServiceChargesModel = mongoose.model(
  "ServiceCharges",
  ServiceCharges
);
