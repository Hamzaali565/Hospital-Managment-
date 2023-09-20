import mongoose from "mongoose";

const partyModel = new mongoose.Schema({
  partyCode: { type: String, required: true },
  partyDescription: { type: String, required: true },
  parentCode: { type: String },
  Address: { type: String },
  coOrdinator: { type: String },
  area: { type: String },
  email: { type: String },
  contactNo: { type: String },
  accountCode: { type: String },
  transactionType: { type: Boolean, default: false },
  status: { type: Boolean, default: false },
  defaultType: { type: Boolean, default: false },
  paymentReciept: { type: Boolean, default: false },
});

export const PartyModel = mongoose.model("partyModel", partyModel);
