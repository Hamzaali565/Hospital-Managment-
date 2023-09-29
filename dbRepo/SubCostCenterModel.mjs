import mongoose from "mongoose";

const SubCostCenter = new mongoose.Schema({
  costCode: { type: String, required: true },
  costName: { type: String, required: true },
  subCode: { type: String, required: true },
  subName: { type: String, required: true },
  remarks: { type: String, required: true },
  status: { type: Boolean, default: false },
});

export const SubCostModel = mongoose.model("SubCostCenter", SubCostCenter);
