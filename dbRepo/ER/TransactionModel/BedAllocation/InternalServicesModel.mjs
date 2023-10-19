import mongoose from "mongoose";

const ERInternalServices = new mongoose.Schema({
  erNo: { type: String, required: true },
  mrNo: { type: String, required: true },
  patientName: { type: String, required: true },
  gender: { type: String, required: true },
  partyCode: { type: String, required: true },

  internalService: [
    {
      serviceName: { type: String },
      noOfTimes: { type: Number },
      charges: { type: Number },
      amount: { type: Number },
    },
  ],
  //   consultantVisit: [
  //     {
  //       consultantName: { type: String },
  //       charges: { type: Number },
  //     },
  //   ],
  //   labService: [
  //     {
  //       testName: { type: String },
  //       noOfTimes: { type: Number },
  //       charges: { type: Number },
  //       amount: { type: Number },
  //     },
  //   ],
  //   radiologyServices: [
  //     {
  //       testName: { type: String },
  //       charges: { type: Number },
  //     },
  //   ],
  //   medicineService: [
  //     {
  //       medicineName: { type: String },
  //       strength: { type: Number },
  //       unit: { type: String },
  //       quantity: { type: Number },
  //     },
  //   ],
});
export const InternalServicesModel = mongoose.model(
  "ERInternalServices",
  ERInternalServices
);
