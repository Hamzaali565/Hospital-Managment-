import express from "express";
import { resultEntryModel } from "../../../dbRepo/Lab/Result/ResultModel.mjs";
import { LabRegisteraionModel } from "../../../dbRepo/Lab/Transaction/LabRegistrationModel.mjs";

const router = express.Router();

router.post("/resultentry", async (req, res) => {
  try {
    const {
      test_id,
      testCode,
      testName,
      testDate,
      testRanges,
      testResult,
      labNo,
    } = req.body;
    console.log("req.body", req.body);
    if (
      ![
        test_id,
        testCode,
        testName,
        testDate,
        testRanges,
        testResult,
        labNo,
      ].every(Boolean)
    )
      throw new Error("All Parameters sre required");
    const newData = await LabRegisteraionModel.find({ labNo });
    if (newData.length <= 0)
      throw new Error("Please try again by refreshing page!!");
    const createResult = await resultEntryModel.create({
      test_id,
      testCode,
      testName,
      otherDetails: newData,
      testRanges,
      testResult,
      labNo,
    });
    res.status(200).send({ data: createResult });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

export default router;
