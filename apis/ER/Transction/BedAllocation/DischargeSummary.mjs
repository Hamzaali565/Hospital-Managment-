import express from "express";
import { DischargeSummaryModel } from "../../../../dbRepo/ER/TransactionModel/BedAllocation/DischargeSummaryModel.mjs";
import { FrontRegModel } from "../../../../dbRepo/ER/TransactionModel/ERFrontRegModel.mjs";

const router = express.Router();
router.post("/dischargeSummary", async (req, res) => {
  try {
    const {
      erNo,
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
    if (![erNo].every(Boolean)) throw new Error("All Parameters Are Required");
    const CheckDuplicate = await DischargeSummaryModel.find({ erNo });
    if (CheckDuplicate.length > 0) throw new Error("Goto Edit Form");
    const PatientData = await FrontRegModel.find({ erRegNo: erNo });
    if (PatientData.length <= 0) throw new Error("Er No. Not Found.");
    const { mrNo, patientName, wardType, bedNo } = PatientData[0];
    const craeteDischargeSummary = await DischargeSummaryModel.create({
      erNo,
      mrNo,
      patientName,
      ward: wardType,
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
