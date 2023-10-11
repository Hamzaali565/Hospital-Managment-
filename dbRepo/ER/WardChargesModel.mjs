import mongoose from "mongoose";

const WardCharges = new mongoose.Schema({
  partyName: { type: String, required: true },
  wardName: { type: String, required: true },
  rates: [
    {
      wardLocation: { type: String },
      bedNo: { type: String },
      bedAmount: { type: String },
      status: { type: Boolean, default: true },
    },
  ],
});
export const WardChargesModel = mongoose.model("WardCharges", WardCharges);
