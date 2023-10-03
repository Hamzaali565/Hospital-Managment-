import express from "express";
import { WardModel } from "../../dbRepo/WardModel.mjs";
const router = express.Router();
router.post("/ward", async (req, res) => {
  try {
    const { code, description, status } = req.body;
    if (![code, description].every(Boolean))
      throw new Error("All Parameters Are Requires");
    const duplicateCheck = await WardModel.find({ code }, "code -_id");
    if (duplicateCheck.length > 0)
      throw new Error("This Code is Already Taken");
    const CreateWard = await WardModel.create({ description, code, status });
    res.status(201).json({ data: CreateWard });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
export default router;
