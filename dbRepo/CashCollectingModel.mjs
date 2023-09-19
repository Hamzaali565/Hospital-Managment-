import mongoose from "mongoose";

const cashCollecting = new mongoose.Schema({
  code: { type: String, required: true },
  description: { type: String, required: true },
});
export const cashCollectingModel = mongoose.model(
  "cashCollecting",
  cashCollecting
);
