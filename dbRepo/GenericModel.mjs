import mongoose from "mongoose";
const Generic = new mongoose.Schema({
  code: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: Boolean, default: true },
});
export const GenericModel = mongoose.model("Generic", Generic);
