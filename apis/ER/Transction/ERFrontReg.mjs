import express from "express";
import { FrontRegModel } from "../../../dbRepo/ER/TransactionModel/ERFrontRegModel.mjs";

const router = express.Router();

router.post("/erfrontreg", async (req, res) => {
  try {
    // console.log("Body", req.body);
    const {
      erRegNo,
      partyCode,
      corporateNo,
      mrNo,
      wardType,
      bedNo,
      patientName,
      age,
      cellNo,
      address,
      gender,
      maritalStatus,
      dateBirth,
    } = req.body;
    if (
      ![
        partyCode,
        corporateNo,
        wardType,
        bedNo,
        patientName,
        cellNo,
        gender,
        maritalStatus,
        dateBirth,
      ].every(Boolean)
    )
      throw new Error("All Parameters Are Required");
    const checkDuplicate = await FrontRegModel.find(
      { erRegNo },
      "erRegNo -_id"
    );
    if (checkDuplicate.length > 0) throw new Error("GOTO EDIT FORM");
    console.log("ko");
    const getERNo = await FrontRegModel.find({}, "erRegNo -_id", {
      sort: { erRegNo: -1 },
      limit: 1,
    });
    console.log(getERNo);
    const createErFrontReg = await FrontRegModel.create({
      erRegNo: getERNo?.length > 0 ? getERNo[0]?.erRegNo + 1 : 1,
      partyCode,
      corporateNo,
      mrNo,
      wardType,
      bedNo,
      patientName,
      age,
      cellNo,
      address,
      gender,
      maritalStatus,
      dateBirth,
    });
    res.status(200).send({ data: createErFrontReg });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
export default router;
