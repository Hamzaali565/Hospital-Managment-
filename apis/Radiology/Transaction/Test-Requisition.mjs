import express from "express";
import { RadioTestReqModel } from "../../../dbRepo/Radiology/Transaction/Test-RequisitionModel.mjs";

const router = express.Router();

router.post("/radiotestreq", async (req, res) => {
  try {
    const {
      radiologyNo,
      mrNo,
      patientName,
      gender,
      maritalStatus,
      age,
      consultant,
      cellNo,
      address,
      party,
      testInfo,
      cashLocation,
      paymentType,
      discountType,
      discountAmount,
      bankName,
      totalAmount,
      recievedAmount,
      balanceAmount,
      payableAmount,
    } = req.body;
    if (
      ![
        mrNo,
        patientName,
        gender,
        maritalStatus,
        age,
        consultant,
        cellNo,
        party,
        testInfo,
        cashLocation,
        paymentType,
        recievedAmount,
      ].every(Boolean)
    )
      throw new Error("All Parameters Are Required.");
    testInfo.map((items, i) => {
      if (![items.testName, items.amount].every(Boolean))
        throw new Error(`TestName and Amount is Required at Line No. ${i + 1}`);
    });
    let duplicate = [];
    let unique = [];
    testInfo.forEach((items) => {
      if (unique.includes(items.testName)) {
        duplicate.push(items);
      } else {
        unique.push(items.testName);
      }
    });
    if (duplicate.length > 0)
      throw new Error(`Duplicate TestNames are not Allow.`);
    let total = testInfo.reduce((a, b) => {
      return a + b.amount;
    }, 0);
    const balance = total - recievedAmount;

    const radionumber = await RadioTestReqModel.find({}, "radiologyNo -_id", {
      sort: {
        radiologyNo: -1,
      },
      limit: 1,
    });
    console.log(radionumber);
    const createData = await RadioTestReqModel.create({
      radiologyNo:
        radionumber[0].radiologyNo === 0 ? 1 : radionumber[0].radiologyNo + 1,
      mrNo,
      patientName,
      gender,
      maritalStatus,
      age,
      consultant,
      cellNo,
      address,
      party,
      testInfo,
      cashLocation,
      paymentType,
      discountType,
      discountAmount,
      bankName,
      totalAmount: total,
      recievedAmount,
      balanceAmount: balance > 0 ? balance : 0,
      payableAmount: balance < 0 ? balance : 0,
    });
    res.status(200).send({ data: createData });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get("/getradiotests", async (req, res) => {
  try {
    let getAll = await RadioTestReqModel.find({ cashTagged: false });
  } catch (error) {
    res.status(200).send({ message: error.message });
  }
});

export default router;
