import express from "express";
import { DischargeSummaryModel } from "../../../../dbRepo/ER/TransactionModel/BedAllocation/DischargeSummaryModel.mjs";

const router = express.Router();
router.post("/dischargeSummary", async (req, res) => {
  try {
    const {
      erNo,
      mrNo,
      patientName,
      ward,
      bedNo,
      cheifComplaints,
      coMortside,
      breifSummary,
      treatmentCourse,
      releventInvestigation,
      dateOfOperation,
      procedureFinding,
      conditionOnDischarge,
      medicationOnDischarge,
      instructionOnDischarge,
      opdFollowUp,
      followUpLabs,
    } = req.body;
    if (![erNo, mrNo, patientName, ward, bedNo].every(Boolean))
      throw new Error("All Parameters Are Required");
    const CheckDuplicate = await DischargeSummaryModel.find({ erNo });
    if (CheckDuplicate.length > 0) throw new Error("Goto Edit Form");
    const craeteDischargeSummary = await DischargeSummaryModel.create({
      erNo,
      mrNo,
      patientName,
      ward,
      bedNo,
      cheifComplaints,
      coMortside,
      breifSummary,
      treatmentCourse,
      releventInvestigation,
      dateOfOperation,
      procedureFinding,
      conditionOnDischarge,
      medicationOnDischarge,
      instructionOnDischarge,
      opdFollowUp,
      followUpLabs,
    });
    res.status(200).send({ data: craeteDischargeSummary });
    return;
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
export default router;
