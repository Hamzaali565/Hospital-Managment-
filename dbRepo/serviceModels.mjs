import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const service = new mongoose.Schema({
  parentCode: { type: Number, required: true },
  childCode: { type: Number },
  parentName: { type: String, required: true },
  childName: { type: String },
});
export const serviceModel = mongoose.model("service", service);

////////////////mongodb connected disconnected events///////////////////////////////////////////////
