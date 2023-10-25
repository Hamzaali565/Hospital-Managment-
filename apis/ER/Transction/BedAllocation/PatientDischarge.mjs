import express from "express";
import { PatientDischargeModel } from "../../../../dbRepo/ER/TransactionModel/BedAllocation/PatientDischargeModel.mjs";

const router = express.Router();

router.post("/patientdischarge", async (req, res) => {
  try {
    const {
      erNo,
      mrNo,
      patientName,
      gender,
      partyCode,
      dutyDoctor,
      dutyStaff,
      dischargeCondition,
      symptoms,
      remarks,
    } = req.body;
    console.log("partyCode", partyCode);
    if (
      ![
        erNo,
        mrNo,
        patientName,
        gender,
        partyCode,
        dutyDoctor,
        dutyStaff,
        dischargeCondition,
        symptoms,
      ].every(Boolean)
    )
      throw new Error("All Parameters Are Required.");
    const createPatientDischarge = await PatientDischargeModel.create({
      erNo,
      mrNo,
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
