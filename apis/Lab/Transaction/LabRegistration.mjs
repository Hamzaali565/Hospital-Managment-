import express from "express";
import { LabRegisteraionModel } from "../../../dbRepo/Lab/Transaction/LabRegistrationModel.mjs";

const router = express.Router();

router.post("/labregistration", async (req, res) => {
  console.log(req.body);
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
      throw new Error("All Parameters Are Required");
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
    });
    res.status(200).send({ data: createdLabRegisttraion });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

export default router;
