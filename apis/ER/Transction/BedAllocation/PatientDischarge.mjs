import express from "express";
import { PatientDischargeModel } from "../../../../dbRepo/ER/TransactionModel/BedAllocation/PatientDischargeModel.mjs";
import { FrontRegModel } from "../../../../dbRepo/ER/TransactionModel/ERFrontRegModel.mjs";
import { DischargeSummaryModel } from "../../../../dbRepo/ER/TransactionModel/BedAllocation/DischargeSummaryModel.mjs";

const router = express.Router();

router.post("/patientdischarge", async (req, res) => {
  try {
    const {
      erNo,
      dutyDoctor,
      dutyStaff,
      dischargeCondition,
      symptoms,
      remarks,
    } = req.body;

    if (
      ![erNo, dutyDoctor, dutyStaff, dischargeCondition, symptoms].every(
        Boolean
      )
    )
      throw new Error("All Parameters Are Required.");
    const DischargeSummaryCheck = await DischargeSummaryModel.find({ erNo });
    if (DischargeSummaryCheck.length <= 0)
      throw new Error("Discharge Summary not Created.");
    const patientData = await FrontRegModel.find({ erRegNo: erNo });
    if (patientData.length <= 0)
      throw new Error("ER No. Not Found in Front Data.");
    const { mrNo, bedNo, wardType, patientName, gender, partyCode } =
      patientData[0];
    const injectStaff = await FrontRegModel.findOneAndUpdate(
      { erRegNo: erNo },
      { dutyDoctor, dutyStaff },
      { new: true }
    );
    if (injectStaff.length <= 0) throw new Error("Staff Not Injected.");
    const createPatientDischarge = await PatientDischargeModel.create({
      erNo,
      mrNo,
      bedNo,
      ward: wardType,
      patientName,
      gender,
      partyCode,
      dutyDoctor,
      dutyStaff,
      dischargeCondition,
      symptoms,
      remarks,
    });
    res.status(400).send({ data: createPatientDischarge });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
export default router;
