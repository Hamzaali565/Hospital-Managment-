import mongoose from "mongoose";

const ConsultantUserMapping = new mongoose.Schema({
  spreciality: { type: String, required: true },
  consultant: { type: String, required: true },
  roomNo: { type: String, required: true },
  user: { type: String, required: true },
  address: { type: String },
  cellNo: { String },
  email: { String },
});

export const ConsultantUserMappingModel = mongoose.model(
  "ConsultantUserMapping",
  ConsultantUserMapping
);
