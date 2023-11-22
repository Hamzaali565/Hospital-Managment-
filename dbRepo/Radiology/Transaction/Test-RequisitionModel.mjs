import mongoose from "mongoose";

const RadioTestReq = new mongoose.Schema({
  radiologyNo: { type: Number },
  mrNo: { type: Number, required: true },
  patientName: { type: String, required: true },
  gender: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  age: { type: String, required: true },
  consultant: { type: String, required: true },
  cellNo: { type: String, required: true },
  address: { type: String },
  party: { type: String, required: true },
  testInfo: [
    {
      testName: { type: String },
      amount: { type: Number },
      date: { type: Date, default: Date.now },
      tagged: { type: Boolean, default: false },
    },
  ],
  cashLocation: { type: String, required: true },
  paymentType: { type: String },
  discountType: { type: String },
  discountAmount: { type: Number },
  bankName: { type: String },
  date: { type: Date, default: Date.now },
  totalAmount: { type: Number, required: true },
  recievedAmount: { type: Number, required: true },
  balanceAmount: { type: Number, required: true },
  payableAmount: { type: Number, required: true },
});

export const RadioTestReqModel = mongoose.model("RadioTestReq", RadioTestReq);
