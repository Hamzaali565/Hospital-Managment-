import mongoose from "mongoose";

const Approval = new mongoose.Schema({
  moduleName: { type: String, required: true },
  department: { type: String, required: true },
  formName: { type: String, required: true },
  totalApprovals: { type: String, required: true },
  users: [
    {
      userName: { type: String },
      atLevel: { type: String },
      email: { type: String },
    },
  ],
});
export const ApprovalModel = mongoose.model("Approvals", Approval);
