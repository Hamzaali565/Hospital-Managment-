import mongoose from "mongoose";

const CashRoaster = new mongoose.Schema({
  name: { type: String, required: true },
  cashLocation: { type: String, required: true },
  receiptType: [
    {
      description: { type: String },
      status: { type: Boolean, default: true },
      paymentType: { type: String },
    },
  ],
});
export const CashRoasterModel = mongoose.model("CashRoaster", CashRoaster);
