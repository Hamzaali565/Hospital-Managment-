import mongoose, { Mongoose } from "mongoose";

const LabCharges = new mongoose.Schema({
  party: { type: String, required: true },
  party_id: { type: String, required: true },
  testsPrice: [
    {
      testCode: { type: String },
      testName: { type: String },
      price: { type: Number },
      status: { type: Boolean },
    },
  ],
});

export const LabChargesModel = mongoose.model("Lab Charges", LabCharges);
