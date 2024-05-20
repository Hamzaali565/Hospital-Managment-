import mongoose from "mongoose";

const ResultEntry = new mongoose.Schema({
  test_id: { type: mongoose.ObjectId, required: true },
  testCode: { type: Number, required: true },
  labNo: { type: Number, required: true },
  otherDetails: { type: Array, required: true },
  testName: { type: String, required: true },
  testRanges: { type: Array, required: true },
  testResult: { type: String, required: true },
  resultTime: { type: Date, default: Date.now },
});

export const resultEntryModel = mongoose.model("Test Result", ResultEntry);
