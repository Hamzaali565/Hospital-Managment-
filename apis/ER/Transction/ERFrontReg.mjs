import express from "express";
import { FrontRegModel } from "../../../dbRepo/ER/TransactionModel/ERFrontRegModel.mjs";
import { ERPatientRegisterModel } from "../../../dbRepo/ER/TransactionModel/ERPatientRegisterModel.mjs";

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
    const getmr = await ERPatientRegisterModel.find({}, "mrNo -_id", {
      sort: { mrNo: -1 },
      limit: 1,
    });
    console.log("mrno", getmr);
    const createErFrontReg = await FrontRegModel.create({
      erRegNo: getERNo?.length > 0 ? getERNo[0]?.erRegNo + 1 : 1,
      partyCode,
      corporateNo,
      mrNo:
        mrNo.length === 0
          ? getmr?.length > 0
            ? getmr[0]?.mrNo + 1
            : mrNo
          : mrNo,
      wardType,
      bedNo,
      patientName,
      age,
      cellNo,
      address,
      gender,
      maritalStatus,
      dateBirth,
      admissionAt: new Date(),
    });
    res.status(200).send({ data: createErFrontReg });
  } catch (error) {
    console.log("erERROR", error);
    res.status(400).send({ message: error.message });
  }
});

router.get("/getward", async (req, res) => {
  try {
    const getERWard = await FrontRegModel.find(
      { wardType: "ER" },
      "patientName wardType mrNo bedNo erRegNo partyCode gender"
    );
    res.status(200).send({ data: getERWard });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get("/geterdischarged", async (req, res) => {
  try {
    const getERWard = await FrontRegModel.find({ discharged: true });
    res.status(200).send({ data: getERWard });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

export default router;
