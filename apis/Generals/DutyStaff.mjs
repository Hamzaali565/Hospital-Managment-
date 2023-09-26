import mongoose from "mongoose";
import express from "express";
import { dutyStaffModel } from "../../dbRepo/DutyStaffModel.mjs";

const router = express.Router();

router.post("/dutystaff", async (req, res) => {
  try {
    const { staffCode, staffName } = req.body;
    if (![staffCode, staffName].every(Boolean))
      throw new Error("All Parameters are required");
    const codeCheck = await dutyStaffModel.find(
      { staffCode },
      "staffCode -_id"
    );
    console.log(codeCheck);
    if (codeCheck.length > 0) {
      if (codeCheck[0].staffCode == staffCode)
        throw new Error("Code Already Taken");
    }
    const pushData = await dutyStaffModel.create({ staffCode, staffName });
    res
      .status(201)
      .json({ message: `New Staff Added Successfully`, data: { pushData } });
  } catch (error) {
    // console.log();
    res.status(400).send({ message: error.message });
  }
});

export default router;
