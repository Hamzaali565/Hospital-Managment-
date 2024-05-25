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
      testRanges,
      testResult,
      labNo,
      mainId,
    } = req.body;
    console.log("req.body", req.body);
    if (
      ![
        test_id,
        testCode,
        testName,
        testRanges,
        testResult,
        labNo,
        mainId,
      ].every(Boolean)
    )
      throw new Error("All Parameters sre required");
    const newData = await LabRegisteraionModel.find({ labNo });
    if (newData.length <= 0)
      throw new Error("Please try again by refreshing page!!");
    console.log("id", mainId);
    console.log("test_id", test_id);
    const response = await LabRegisteraionModel.findOneAndUpdate(
      {
        _id: newData[0]._id,
        "test._id": mainId,
      },
      { $set: { "test.$.resultEntry": true } },
      { new: true } // return updated doc
    );

    console.log("response:", response); // Log the updated document

    if (!response) {
      throw new Error(
        "Failed to find and update document in LabRegisteraionModel"
      );
    }

    const createResult = await resultEntryModel.create({
      test_id,
      testCode,
      testName,
      otherDetails: newData,
      testRanges,
      testResult,
      labNo,
    });

    console.log("createResult:", createResult); // Log the result of the creation

    if (!createResult) {
      throw new Error("Failed to create result entry");
    }

    if (!newData[0]._id) {
      throw new Error("Invalid newData structure: _id is missing");
    }

    res.status(200).send({ data: createResult });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get("/result", async (req, res) => {
  try {
    const { labNo } = req.query;
    if (!labNo) throw new Error("LAB NO. IS REQUIRED!!!");
    const result = await resultEntryModel.find({ labNo: labNo });
    if (result.length <= 0) throw new Error("RESULT IS NOT ENTERED YET 🥺");
    res.status(200).send({ data: result });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

export default router;
