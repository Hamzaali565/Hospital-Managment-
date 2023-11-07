import express from "express";
import { FrontRegModel } from "../../../../dbRepo/ER/TransactionModel/ERFrontRegModel.mjs";
import { ConsultantNotesModel } from "../../../../dbRepo/ER/TransactionModel/Patient Investigation/ConsultantNotesModel.mjs";
const router = express.Router();
router.post("/notes", async (req, res) => {
  try {
    const { erNo, consultant, consultantRemarks, enteredBy } = req.body;
    if (![erNo, consultantRemarks, enteredBy].every(Boolean))
      throw new Error("All Parameters are required");
    const editCheck = await ConsultantNotesModel.find({ erNo });
    if (editCheck.length > 0) throw new Error("Switch to Edit.");
    const erNoFind = await FrontRegModel.find({ erRegNo: erNo });
    if (erNoFind.length === 0) throw new Error("ER No. not found");
    let sortedData = erNoFind.map((items) => ({
      erNo: items.erRegNo,
      patientName: items.patientName,
      gender: items.gender,
      mrNo: items.mrNo,
      ward: items.wardType,
      bedNo: items.bedNo,
      party: items.partyCode,
    }));
    sortedData = sortedData.reduce((result, data) => {
      return { ...result, ...data };
    }, {});
    console.log("sortedData", sortedData);
    const createConsultantNotes = await ConsultantNotesModel.create({
      erNo,
      patientName: sortedData.patientName,
      gender: sortedData.gender,
      mrNo: sortedData.mrNo,
      ward: sortedData.ward,
      bedNo: sortedData.bedNo,
      party: sortedData.party,
      consultantRemarks,
      enteredBy,
      consultant,
    });
    res.status(200).send({ data: createConsultantNotes });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

export default router;
