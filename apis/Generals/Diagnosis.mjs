import express from "express";
import { DiagnosisModel } from "../../dbRepo/DiagnosisModel.mjs";
const router = express.Router();
router.post("/diagnosis", async (req, res) => {
  try {
    const { code, name, status } = req.body;
    if (![code, name].every(Boolean))
      throw new Error("All Parameters Are Required.");
    const checkDuplicate = await DiagnosisModel.find(
      { $or: [{ code }, { name }] },
      "code -_id"
    );
    if (checkDuplicate.length > 0)
      throw new Error("Code Or Diagnosis Name is Already Taken");
    const CreateDiagnosis = await DiagnosisModel.create({ code, status, name });
    res.status(200).send({ data: CreateDiagnosis });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
export default router;
