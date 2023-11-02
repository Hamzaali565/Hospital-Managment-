import express from "express";
import { SODModel } from "../../../../dbRepo/ER/TransactionModel/Patient Investigation/SYMP-OBS-DIAG-Model.mjs";

const router = express.Router();

router.post("/sod", async (req, res) => {
  try {
    const {
      erNo,
      consultant,
      patientName,
      mrNo,
      ward,
      party,
      gender,
      initialDiagnosis,
      knownAllergies,
      followupPlan,
      symptoms,
      diagnosis,
    } = req.body;
    if (
      ![
        erNo,
        consultant,
        patientName,
        mrNo,
        ward,
        gender,
        party,
        initialDiagnosis,
        knownAllergies,
        followupPlan,
        symptoms,
        diagnosis,
      ].every(Boolean)
    )
      throw new Error("All Paramters Are Required");
    const editCheck = await SODModel.find({ erNo });
    if (editCheck.length > 0) throw new Error("Goto Edit Form");
    if (Object.keys(symptoms[0]).length <= 0)
      throw new Error("Please Input Symptom Name at line 1.");
    if (Object.keys(diagnosis[0]).length <= 0)
      throw new Error("Please Input Diagnosis Name at line 1.");
    symptoms.map((item, i) => {
      if (![item.sympName].every(Boolean))
        throw new Error(`Empty field or Error at line No. ${i + 1}`);
    });
    diagnosis.map((item, i) => {
      if (!item.diagName)
        throw new Error(`Empty field / Error found at line no. ${i + 1}`);
    });
    let duplicate = [];
    let unique = [];
    symptoms.forEach((items, i) => {
      if (unique.includes(items.sympName)) {
        duplicate.push(items.sympName, "sym");
      } else {
        unique.push(items.sympName);
      }
    });
    if (duplicate.length > 0)
      throw new Error(`Duplicate symptoms name are not Allowed.`);
    diagnosis.forEach((items, i) => {
      if (unique.includes(items.diagName)) {
        duplicate.push(items.diagName, "sym");
      } else {
        unique.push(items.diagName);
      }
    });

    if (duplicate.length > 0)
      throw new Error(`Duplicate diagnosis names are not Allowed.`);
    const createSOD = await SODModel.create({
      erNo,
      consultant,
      patientName,
      mrNo,
      ward,
      party,
      gender,
      initialDiagnosis,
      knownAllergies,
      followupPlan,
      symptoms,
      diagnosis,
    });
    return res.status(200).send({ data: createSOD });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

export default router;
