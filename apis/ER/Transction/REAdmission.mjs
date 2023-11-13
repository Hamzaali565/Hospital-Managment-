import express from "express";
import { FrontRegModel } from "../../../dbRepo/ER/TransactionModel/ERFrontRegModel.mjs";

const router = express.Router();

router.put("/readmission", async (req, res) => {
  try {
    const { erNo, bedNo } = req.body;
    if (!erNo || !bedNo) throw new Error("ER Number / Bed No. is required");
    const ercheck = await FrontRegModel.find({ erRegNo: erNo });
    console.log("ercheck", ercheck);
    if (ercheck[0].discharged !== true)
      throw new Error("This Patient is not discharged yet");
    const readmission = await FrontRegModel.findOneAndUpdate(
      { erRegNo: erNo },
      {
        discharged: false,
        bedNo,
        prevBed: ercheck[0].bedNo,
        admissionAt: Date.now,
        prevAddmissionTime: ercheck[0].admissionAt,
      },
      { new: true }
    );
    res.status(200).send({ data: readmission });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

export default router;
