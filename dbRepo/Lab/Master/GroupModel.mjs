import mongoose from "mongoose";

const LabGroup = new mongoose.Schema({
  groupCode: { type: Number, required: true },
  groupName: { type: String, required: true },
  department: { type: String, required: true },
  reportDays: { type: String, required: true },
  status: { type: Boolean, required: true },
  groupDetails: [
    {
      serialNo: { type: Number },
      testCode: { type: Number },
      testName: { type: String },
      test_id: { type: String },
      testStyle: [
        {
          bold: { type: Boolean },
          italic: { type: Boolean },
          underline: { type: Boolean },
          fontSize: { type: String },
        },
      ],
      rangesDetails: [
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
    },
  ],
});
export const LabGroupModel = mongoose.model("LabGroup", LabGroup);
