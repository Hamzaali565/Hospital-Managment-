import express from "express";
import { PatientVitalsModel } from "../../../../dbRepo/ER/TransactionModel/Patient Investigation/PatientVitalsModel.mjs";

const router = express.Router();

router.post("/patientvitals", async (req, res) => {
  try {
    const {
      erNo,
      consultant,
      patientName,
      gender,
      mrNo,
      ward,
      bedNo,
      party,
      vitals,
    } = req.body;
    if (
      ![erNo, patientName, gender, mrNo, ward, bedNo, party, vitals].every(
        Boolean
      )
    )
      throw new Error("All Parameters Are required");
    if (Object.keys(vitals[0]).length <= 0)
      throw new Error("please complete the first row");
    vitals.map((item, i) => {
      if (!item.vitalsName || !item.vitalsValue)
        throw new Error(`please complete the row number ${i + 1}`);
    });
    let duplicate = [];
    let unique = [];

    vitals.forEach((items) => {
      if (unique.includes(items.vitalsName)) {
        duplicate.push(items.vitalsName);
      } else {
        unique.push(items.vitalsName);
      }
    });
    if (duplicate.length > 0)
      throw new Error(
        `Duplicate Vitals Name found. Please remove ${duplicate}`
      );
    const newPatientVitals = await PatientVitalsModel.create({
      erNo,
      consultant,
      patientName,
      gender,
      mrNo,
      ward,
      bedNo,
      party,
      vitals,
    });
    res.status(200).send({ data: newPatientVitals });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

export default router;
