import mongoose from "mongoose";

const MedicineService = new mongoose.Schema({
  erNo: { type: String, required: true },
  mrNo: { type: String, required: true },
  patientName: { type: String, required: true },
  gender: { type: String, required: true },
  partyCode: { type: String, required: true },
  consultantName: { type: String, required: true },
  medicineService: [
    {
      medicineName: { type: String },
      strength: { type: String },
      unit: { type: String },
      quantity: { type: Number },
    },
  ],
});

export const medicineServiceModel = mongoose.model(
  "MedicineService",
  MedicineService
);
