import mongoose from "mongoose";
const Discount = new mongoose.Schema({
  code: { type: String, required: true },
  status: { type: Boolean, default: true },
  discountName: { type: String, required: true },
  discountPercent: { type: String, required: true },
  account: { type: String, required: true },
});
export const DiscountModel = mongoose.model("Discount", Discount);
