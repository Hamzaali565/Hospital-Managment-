import mongoose from "mongoose";

const Country = new mongoose.Schema({
  code: { type: String, required: true },
  description: { type: String, required: true },
});
export const CountryModel = mongoose.model("Country", Country);
