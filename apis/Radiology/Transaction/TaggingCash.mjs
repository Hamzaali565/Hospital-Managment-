import express from "express";
import { RadioTestReqModel } from "../../../dbRepo/Radiology/Transaction/Test-RequisitionModel.mjs";

const router = express.Router();
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

export default router;
