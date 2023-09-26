import mongoose from "mongoose";
import express from "express";
import { dutyDoctorModel } from "../../dbRepo/DutyDoctorModel.mjs";

const router = express.Router();

router.post("/dutydoctor", async (req, res) => {
  try {
    const { doctorCode, doctorName } = req.body;
    if (![doctorCode, doctorName].every(Boolean))
      throw new Error("All Parameters are required");
    const codeCheck = await dutyDoctorModel.find(
      { doctorCode },
      "doctorCode -_id"
    );
    console.log(codeCheck);
    if (codeCheck.length > 0) {
      if (codeCheck[0].doctorCode == doctorCode)
        throw new Error("Code Already Taken");
    }
    const pushData = await dutyDoctorModel.create({ doctorCode, doctorName });
    res
      .status(201)
      .json({ message: `New Doctor Added Successfully`, data: { pushData } });
  } catch (error) {
    // console.log();
    res.status(400).send({ message: error.message });
  }
});

export default router;
