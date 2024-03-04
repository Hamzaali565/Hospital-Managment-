import express from "express";
import { departmentRemaksModel } from "../../../dbRepo/Lab/Master/TestRemarksModel.mjs";
const router = express.Router();

router.post("/testRemarks", async (req, res) => {
  try {
    console.log("req.body", req.body);
    const { department, testCode, remarks, testName, remarkCode } = req.body;
    if (![department, testCode, remarks].every(Boolean))
      throw new Error("Please provide all fields");
    const lastCode = await departmentRemaksModel.find({}, "remarkCode", {
      sort: { remarkCode: -1 },
      limit: 1,
    });
    console.log("last code", lastCode[0].remarkCode);
    if (remarkCode !== "") {
      const updateData = await departmentRemaksModel.findOneAndUpdate(
        { remarkCode },
        { remarks },
        { new: true }
      );
      console.log("updateData", updateData);
      res.status(200).send({ Updateddata: updateData });
      return;
    }
    console.log("last code at 25", lastCode[0].remarkCode);
    const createTestRemarks = await departmentRemaksModel.create({
      remarkCode: lastCode.length === 0 ? 1 : lastCode[0].remarkCode + 1,
      testCode,
      remarks,
      testName,
      department,
    });
    console.log("printed Data", createTestRemarks);
    res.status(200).send({ data: createTestRemarks });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get("/getremarks", async (req, res) => {
  try {
    let response = await departmentRemaksModel.find({});
    console.log("response", response);
    res.status(200).send({ data: response });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

export default router;
