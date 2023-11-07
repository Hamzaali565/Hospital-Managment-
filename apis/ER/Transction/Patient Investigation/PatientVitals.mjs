import express from "express";
import { PatientVitalsModel } from "../../../../dbRepo/ER/TransactionModel/Patient Investigation/PatientVitalsModel.mjs";
import { ERPatientRegisterModel } from "../../../../dbRepo/ER/TransactionModel/ERPatientRegisterModel.mjs";
import { FrontRegModel } from "../../../../dbRepo/ER/TransactionModel/ERFrontRegModel.mjs";

const router = express.Router();

router.post("/patientvitals", async (req, res) => {
  try {
    const {
      erNo,
      consultant,
      patientName,
      gender,
      mrNo,
      ward,
      bedNo,
      party,
      vitals,
    } = req.body;
    if (![erNo, vitals].every(Boolean))
      throw new Error("All Parameters Are required");
    const findData = await FrontRegModel.find({ erRegNo: erNo });
    let sortedData = findData.map((items) => ({
      erNo: items.erRegNo,
      patientName: items.patientName,
      gender: items.gender,
      mrNo: items.mrNo,
      ward: items.wardType,
      bedNo: items.bedNo,
      party: items.partyCode,
    }));
    sortedData = sortedData.reduce((result, currentObj) => {
      return { ...result, ...currentObj };
    }, {});
    console.log(sortedData);
    if (findData.length <= 0) throw new Error("ER No. not found.");
    const erCheck = await PatientVitalsModel.find({ erNo });
    if (erCheck.length > 0) throw new Error("Switch to Edit");
    if (Object.keys(vitals[0]).length <= 0)
      throw new Error("please complete the first row");
    vitals.map((item, i) => {
      if (!item.vitalsName || !item.vitalsValue)
        throw new Error(`please complete the row number ${i + 1}`);
    });
    let duplicate = [];
    let unique = [];

    vitals.forEach((items) => {
      if (unique.includes(items.vitalsName)) {
        duplicate.push(items.vitalsName);
      } else {
        unique.push(items.vitalsName);
      }
    });
    if (duplicate.length > 0)
      throw new Error(
        `Duplicate Vitals Name found. Please remove ${duplicate}`
      );
    const newPatientVitals = await PatientVitalsModel.create({
      erNo: sortedData.erNo,
      consultant,
      patientName: sortedData.patientName,
      gender: sortedData.gender,
      mrNo: sortedData.mrNo,
      ward: sortedData.ward,
      bedNo: sortedData.bedNo,
      party: sortedData.party,
      vitals,
    });
    res.status(200).send({ data: newPatientVitals });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

export default router;
