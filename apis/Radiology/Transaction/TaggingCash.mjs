import express from "express";
import { RadioTestReqModel } from "../../../dbRepo/Radiology/Transaction/Test-RequisitionModel.mjs";
import mongoose from "mongoose";

const router = express.Router();
// get all untagged data //
router.get("/taggingcash", async (req, res) => {
  try {
    let data2 = await RadioTestReqModel.find(
      { "testInfo.tagged": "false" },
      "testInfo"
    );
    let data = await RadioTestReqModel.find({});
    let d2 = data.map((items) => ({
      testinfo: items.testInfo.map((test) => {
        return {
          name: items.patientName,
          party: items.party,
          gender: items.gender,
          redNo: items.radiologyNo,
          testName: test.testName,
          amount: test.amount,
          tagged: test.tagged,
          date: test.date,
          testId: test._id,
        };
      }),
    }));

    const filteredData = d2.map((item) => ({
      testinfo: item.testinfo.filter((test) => test.tagged !== true),
    }));

    console.log("d2", filteredData);
    res.status(200).send({ data: filteredData });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// tagged to true //
router.put("/taghere", async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) throw new Error("_id parameter is required.");
    let data = await RadioTestReqModel.findOneAndUpdate(
      { "testInfo._id": mongoose.Types.ObjectId(_id) },
      { $set: { "testInfo.$.tagged": true } },
      { new: true }
    );
    if (!data) {
      throw new Error("No matching document found.");
    }
    res.status(200).send({ data: data });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// get all tagged data //

router.get("/untagcash", async (req, res) => {
  try {
    let data = await RadioTestReqModel.find({});
    let d2 = data.map((items) => ({
      testInfo: items.testInfo.map((test) => {
        return {
          name: items.patientName,
          party: items.party,
          gender: items.gender,
          redNo: items.radiologyNo,
          testName: test.testName,
          amount: test.amount,
          tagged: test.tagged,
          date: test.date,
          testId: test._id,
        };
      }),
    }));
    const filteredResponse = d2
      .map((items) => ({
        testInfo: items.testInfo.filter((fil) => fil.tagged !== false),
      }))
      .filter((obj) => obj.testInfo.length > 0);
    res.status(200).send({ data: filteredResponse });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
// tagged to false
router.put("/untaghere", async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) throw new Error("_id parameter is required.");
    const data = await RadioTestReqModel.findOneAndUpdate(
      { "testInfo._id": _id },
      { $set: { "testInfo.$.tagged": false } },
      { new: true }
    );
    res.status(200).send({ data });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
export default router;
