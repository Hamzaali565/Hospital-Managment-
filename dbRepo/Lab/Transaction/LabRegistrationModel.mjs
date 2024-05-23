import mongoose from "mongoose";

import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose);

const LabRegSchema = new mongoose.Schema({
  mrData: { type: Array, required: true },
  consultantName: { type: String, required: true },
  consultantCode: { type: String, required: true },
  remarks: { type: String, required: true },
  partyName: { type: String, required: true },
  partyCode: { type: Number, required: true },
  shiftNo: { type: Number, required: true },
  labNo: { type: Number, unique: true },
  test: [
    {
      name: { type: String, required: true },
      code: { type: Number, required: true },
      price: { type: Number, required: true },
      tagType: { type: Boolean, default: false },
      department: { type: String },
      resultEntry: { type: Boolean, default: false },
      test_id: { type: mongoose.ObjectId, required: true },
    },
  ],
  receiptType: { type: String, required: true },
  receiptLocation: { type: String, required: true },
  createdUser: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  voucherUser: { type: String },
  voucherTag: { type: Boolean, default: false },
  voucherDate: { type: Date },
  bankName: { type: String },
  referalNo: { type: String },
  totalAmount: { type: Number, required: true },
});

LabRegSchema.plugin(AutoIncrement, { inc_field: "labNo" });

export const LabRegisteraionModel = mongoose.model(
  "Lab Registration",
  LabRegSchema
);

// mrNo: { type: Number, required: true },
//   patientName: { type: String, required: true },
//   gender: { type: String, required: true },
//   maritalStatus: { type: String, required: true },
//   age: { type: String, required: true },
//   cellNo: { type: String, required: true },
//   address: { type: String, required: true },
