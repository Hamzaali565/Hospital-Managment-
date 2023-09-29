import mongoose from "mongoose";
const Department = new mongoose.Schema({
  departmentCode: { type: String, required: true },
  departmentName: { type: String, required: true },
  status: { type: Boolean, default: false },
});

export const DepartmentModel = mongoose.model("Department", Department);
