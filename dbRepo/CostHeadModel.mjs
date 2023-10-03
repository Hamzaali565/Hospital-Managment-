import mongoose from "mongoose";

const CostHead = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  status: { type: Boolean, default: false },
});

export const CostHeadModel = mongoose.model("CostHead", CostHead);
