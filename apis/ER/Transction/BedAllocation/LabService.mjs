import express from "express";
import { LabServiceModel } from "../../../../dbRepo/ER/TransactionModel/BedAllocation/LabServiceModel.mjs";

const router = express.Router();
router.post("/labservices", async (req, res) => {
  try {
    const {
      erNo,
      mrNo,
      patientName,
      gender,
      partyCode,
      consultantName,
      labService,
    } = req.body;
    if (
      ![
        erNo,
        mrNo,
        patientName,
        gender,
        partyCode,
        consultantName,
        labService,
      ].every(Boolean)
    )
      throw new Error("All Parameters Are Required.");
    if (labService.length <= 0) throw new Error("labServices are required.");
    if (Object.keys(labService[0]).length <= 0)
      throw new Error("Please fill the first Line");
    const checkChild = await labService.map((items, i) => {
      if (
        ![items.testName, items.noOfTimes, items.charges, items.amount].every(
          Boolean
        )
      )
        throw new Error(`Empty Field / Error at line no. ${i + 1}`);
    });
    let duplicate = [];
    let unique = [];
    const duplicateCheck = await labService.forEach((items) => {
      if (unique.includes(items.testName)) {
        duplicate.push(items.testName);
      } else {
        unique.push(items.testName);
      }
    });
    if (duplicate.length > 0)
      throw new Error("Duplicate Tests Are Not Allowed");
    const createLabServices = await LabServiceModel.create({
      erNo,
      mrNo,
      gender,
      partyCode,
      consultantName,
      patientName,
      labService,
    });
    res.status(200).send({ data: createLabServices });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

export default router;
