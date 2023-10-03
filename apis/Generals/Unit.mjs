import express from "express";
import { UnitModel } from "../../dbRepo/UnitModel.mjs";

const router = express.Router();

router.post("/unit", async (req, res) => {
  try {
    const { code, description } = req.body;
    if (![code, description].every(Boolean))
      throw new Error("All Parameters Are Required.");
    const duplicateCheck = await UnitModel.find({ code }, "code -_id");
    console.log(duplicateCheck);
    if (duplicateCheck.length > 0)
      throw new Error("This Code is Already taken.");
    const createUnit = await UnitModel.create({ code, description });
    res.status(201).json({ data: createUnit });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
export default router;
