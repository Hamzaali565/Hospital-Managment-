import express from "express";
import { ERPatientRegisterModel } from "../../../dbRepo/ER/TransactionModel/ERPatientRegisterModel.mjs";

const router = express.Router();

router.post("/erpatientregister", async (req, res) => {
  try {
    const {
      patientName,
      kinCell,
      kinPassport,
      kinCNIC,
      kinAddress,
      kinOccupation,
      kinRelation,
      kinName,
      nationality,
      area,
      cnic,
      passport,
      city,
      religion,
      email,
      occupation,
      age,
      dateOfBirth,
      address,
      cell,
      mrNo,
      maritalStatus,
      fatherName,
      gender,
    } = req.body;
    if (
      ![
        patientName,
        gender,
        fatherName,
        maritalStatus,
        cell,
        address,
        age,
        religion,
        city,
        cnic,
        area,
        nationality,
        kinName,
        kinRelation,
        kinAddress,
        kinCNIC,
        kinCNIC,
      ].every(Boolean)
    )
      throw new Error(
        "These Fields Are Required : {patientName, gender, fatherName,  maritalStatus, cell,address, age, religion, city, cnic, area,nationality,kinName, kinRelation,  kinAddress, kinCNIC, kinCNIC,}"
      );
    let checkDuplicate = await ERPatientRegisterModel.find(
      { mrNo },
      "-_id mrNo"
    );
    console.log(checkDuplicate.length);
    if (checkDuplicate.length > 0) throw new Error("GOTO EDIT FORM");
    checkDuplicate = await ERPatientRegisterModel.find({}, "-_id mrNo", {
      sort: { _id: -1 },
      limit: 1,
    });
    console.log(checkDuplicate);
    let createERPatient = await ERPatientRegisterModel.create({
      patientName,
      kinCell,
      kinPassport,
      kinCNIC,
      kinAddress,
      kinOccupation,
      kinRelation,
      kinName,
      nationality,
      area,
      cnic,
      passport,
      city,
      religion,
      email,
      occupation,
      age,
      dateOfBirth,
      address,
      cell,
      mrNo: checkDuplicate?.length > 0 ? checkDuplicate[0]?.mrNo + 1 : 1,
      maritalStatus,
      fatherName,
      gender,
    });
    console.log("data", createERPatient);
    res.status(200).send({ data: createERPatient });
    console.log("--------------");
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
router.get("/getmr", async (req, res) => {
  try {
    const response = await ERPatientRegisterModel.find({});
    console.log("response", response);
    res.status(200).send({ data: response });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
export default router;
