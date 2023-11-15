import mongoose from "mongoose";

const Tempelate = new mongoose.Schema({
  reportName: { type: String, required: true },
  serviceName: { type: String, required: true },
  serviceCode: { type: String, required: true },
  template: { type: String, required: true },
});
export const TempelateModel = mongoose.model("Tempelate", Tempelate);
