import mongoose from "mongoose";
const CostCenter = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  status: { type: Boolean, default: false },
  remarks: { type: String },
});
export const CostCenterModel = mongoose.model("CostCenter", CostCenter);
