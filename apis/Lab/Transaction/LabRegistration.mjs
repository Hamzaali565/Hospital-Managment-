import express from "express";
import { LabRegisteraionModel } from "../../../dbRepo/Lab/Transaction/LabRegistrationModel.mjs";
import { testModel } from "../../../dbRepo/Lab/Master/TestModel.mjs";

const router = express.Router();

router.post("/labregistration", async (req, res) => {
  // console.log(req.body);
  try {
    const {
      mrData,
      consultantName,
      consultantCode,
      remarks,
      partyName,
      partyCode,
      shiftNo,
      test,
      createdUser,
      receiptLocation,
      receiptType,
      referalNo,
      totalAmount,
      bankName,
    } = req.body;

    if (
      ![
        mrData,
        consultantName,
        consultantCode,
        remarks,
        partyName,
        partyCode,
        shiftNo,
        test,
        createdUser,
        receiptLocation,
        receiptType,
      ].every(Boolean)
    )
      throw new Error("All fields Are Required");

    console.log("line number 43", test);
    const newData = await Promise.all(
      test.map(async (item) => {
        const regularData = await testModel.findById(item._id, "department");
        return regularData;
      })
    );
    console.log("New Data", newData);

    test.forEach((obj2) => {
      const match = newData.find(
        (obj1) => obj1._id.toString() === obj2._id.toString()
      );
      if (match) {
        obj2.department = match.department;
      }
    });

    const createdLabRegisttraion = await LabRegisteraionModel.create({
      mrData,
      consultantName,
      consultantCode,
      remarks,
      partyName,
      partyCode,
      shiftNo,
      test,
      createdUser,
      receiptLocation,
      receiptType,
      bankName,
      referalNo,
      totalAmount,
    });
    res.status(200).send({ data: createdLabRegisttraion });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

export default router;
