import mongoose from "mongoose";

const dutyStaff = new mongoose.Schema({
  staffCode: { type: Number, required: true },
  staffName: { type: String, required: true },
});
export const dutyStaffModel = mongoose.model("dutyStaff", dutyStaff);
