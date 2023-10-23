import express from "express";
import { medicineServiceModel } from "../../../../dbRepo/ER/TransactionModel/BedAllocation/MedicineServiceModel.mjs";

const router = express.Router();

router.post("/medicineservice", async (req, res) => {
  try {
    const {
      erNo,
      mrNo,
      patientName,
      gender,
      partyCode,
      consultantName,
      medicineService,
    } = req.body;
    if (
      ![
        erNo,
        mrNo,
        patientName,
        gender,
        partyCode,
        consultantName,
        medicineService,
      ].every(Boolean)
    )
      throw new Error("All Parameters Are required.");
    if (medicineService.length <= 0)
      throw new Error("Medicine Services are required.");
    if (Object.keys(medicineService[0]).length === 0)
      throw new Error("Please Complete the first Row.");
    let childCheck = await medicineService.map((items, i) => {
      if (
        ![items.medicineName, items.strength, items.unit, items.quantity].every(
          Boolean
        )
      )
        throw new Error(`Empty field / Error found at line no. ${i + 1}`);
    });
    let unique = [];
    let duplicate = [];
    medicineService.forEach((items) => {
      if (unique.includes(items.medicineName)) {
        duplicate.push(items.medicineName);
      } else {
        unique.push(items.medicineName);
      }
    });
    if (duplicate.length > 0)
      throw new Error("Duplicate Medicine Name is not allowed");
    const createMedicineService = await medicineServiceModel.create({
      erNo,
      mrNo,
      patientName,
      consultantName,
      gender,
      medicineService,
      partyCode,
    });
    res.status(200).send({ data: createMedicineService });
    return;
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

export default router;
