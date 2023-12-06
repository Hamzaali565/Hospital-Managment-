import mongoose from "mongoose";

const LabTest = new mongoose.Schema({
  testCode: { type: Number, required: true },
  testName: { type: String, required: true },
  department: { type: String, required: true },
  category: { type: String, required: true },
  reportDays: { type: Number, required: true },
  testType: { type: String, required: true },
  style: [
    {
      bold: { type: Boolean, default: false },
      underLine: { type: Boolean, default: false },
      Italic: { type: Boolean, default: false },
      fontSize: { String },
    },
  ],
  testRanges: [
    {
      equipment: { type: String },
      gender: { type: String },
      min: { type: Number },
      max: { type: Number },
      unit: { type: String },
      fromAge: { type: Number },
      toAge: { type: Number },
      ageTyoe: { type: String },
      normalRanges: { type: String },
    },
  ],
});
export const testModel = mongoose.model("LabTest", LabTest);
