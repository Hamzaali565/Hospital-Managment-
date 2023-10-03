import express from "express";
import { SpecialityModel } from "../../dbRepo/SpecialityModel.mjs";
const router = express.Router();
router.post("/speciality", async (req, res) => {
  try {
    const { code, description } = req.body;
    if (![code, description].every(Boolean))
      throw new Error("All Parameters are required.");
    const duplicateCheck = await SpecialityModel.find({ code }, "code -_id");
    if (duplicateCheck.length > 0)
      throw new Error("This Code is Already taken");
    const AddSpeciality = await SpecialityModel.create({ description, code });
    res.status(201).json({ message: "success", data: AddSpeciality });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
export default router;
