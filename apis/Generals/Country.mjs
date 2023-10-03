import express from "express";
import { CountryModel } from "../../dbRepo/CountryModel.mjs";

const router = express.Router();

router.post("/country", async (req, res) => {
  try {
    const { code, description } = req.body;
    if (![code, description].every(Boolean))
      throw new Error("All Parameters are Required.");
    const duplicateCheck = await CountryModel.find({ code }, "code -_id");
    if (duplicateCheck.length > 0)
      throw new Error("This Code is Already taken.");
    const createCountry = await CountryModel.create({ description, code });
    res.status(201).json({ message: "Created", data: createCountry });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
export default router;
