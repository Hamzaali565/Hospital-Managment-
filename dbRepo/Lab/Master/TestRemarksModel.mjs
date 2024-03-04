import mongoose from "mongoose";

const DepartmentRemarks = new mongoose.Schema({
  remarkCode: { type: Number, required: true },
  department: { type: String, required: true },
  testCode: { type: Number, required: true },
  testName: { type: String },
  remarks: { type: String, required: true },
});

export const departmentRemaksModel = mongoose.model(
  "DepartmentRemark",
  DepartmentRemarks
);
