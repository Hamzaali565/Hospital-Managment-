import mongoose from "mongoose";

const service = new mongoose.Schema({
  parentCode: { type: Number, required: true },
  childCode: { type: Number },
  ParentName: { type: String, required: true },
  childName: { type: String },
});
export const serviceModel = mongoose.model("service", service);
