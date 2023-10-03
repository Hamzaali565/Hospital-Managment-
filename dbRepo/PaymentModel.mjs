import mongoose from "mongoose";

const PaymentTerm = new mongoose.Schema({
  code: { type: String, required: true },
  description: { type: String, required: true },
});
export const PaymentModel = mongoose.model("PaymentTerm", PaymentTerm);
