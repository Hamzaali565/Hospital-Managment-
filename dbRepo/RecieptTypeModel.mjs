import mongoose from "mongoose";

const RecieptType = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: Boolean, default: false },
  createdOn: { type: Date, default: Date.now },
});

export const RecieptTypeModel = mongoose.model("Reciept Type", RecieptType);
