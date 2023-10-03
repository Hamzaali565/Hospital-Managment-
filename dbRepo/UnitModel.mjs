import mongoose from "mongoose";

const Unit = new mongoose.Schema({
  code: { type: String, required: true },
  description: { type: String, required: true },
});
export const UnitModel = mongoose.model("Unit", Unit);
