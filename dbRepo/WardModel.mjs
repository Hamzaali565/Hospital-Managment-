import mongoose from "mongoose";

const Ward = new mongoose.Schema({
  code: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: Boolean, default: true },
});
export const WardModel = mongoose.model("Ward", Ward);
