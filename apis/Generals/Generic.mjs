import express from "express";
import { GenericModel } from "../../dbRepo/GenericModel.mjs";
const router = express.Router();

router.post("/generic", async (req, res) => {
  try {
    const { code, description, status } = req.body;
    if (![code, description].every(Boolean))
      throw new Error("All Parameters are Required");
    const duplicateCheck = await GenericModel.find({ code }, "code -_id");
    if (duplicateCheck.length > 0)
      throw new Error("This Code is Already Taken");
    const createGeneric = await GenericModel.create({
      code,
      description,
      status,
    });
    res.status(201).json({ Data: createGeneric });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
export default router;
