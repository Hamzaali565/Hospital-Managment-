import express from "express";
import { FrontRegModel } from "../../../dbRepo/ER/TransactionModel/ERFrontRegModel.mjs";
import { ERBillModel } from "../../../dbRepo/ER/TransactionModel/ERBillModel.mjs";
import { PatientDischargeModel } from "../../../dbRepo/ER/TransactionModel/BedAllocation/PatientDischargeModel.mjs";

const router = express.Router();

router.post("/finalerbill", async (req, res) => {
  try {
    const { erNo } = req.body;
    if (!erNo) throw new Error("ER No. is required.");
    const ERCheck = await FrontRegModel.find({ erRegNo: erNo });
    if (ERCheck.length <= 0) throw new Error("ER No. not found.");
    let sotredData = ERCheck.map((items) => ({
      erNo: items.erRegNo,
      patientName: items.patientName,
      gender: items.gender,
      mrNo: items.mrNo,
      ward: items.wardType,
      bedNo: items.bedNo,
      party: items.partyCode,
      dutyDoctor: items.dutyDoctor,
      dutyStaff: items.dutyStaff,
    }));
    sotredData = sotredData.reduce((result, data) => {
      return { ...result, ...data };
    }, {});
    console.log("sotredData", sotredData);
    const createFinalErBill = await ERBillModel.create({
      erNo: sotredData.erNo,
      patientName: sotredData.patientName,
      gender: sotredData.gender,
      mrNo: sotredData.mrNo,
      ward: sotredData.ward,
      bedNo: sotredData.bedNo,
      party: sotredData.party,
      dutyDoctor: sotredData.dutyDoctor,
      dutyStaff: sotredData.dutyStaff,
      discharged: true,
    });
    if (createFinalErBill.length <= 0) throw new Error("Data not created.");
    const updateFrontEr = await FrontRegModel.findOneAndUpdate(
      { erRegNo: erNo },
      { discharged: true },
      { new: true }
    );
    if (updateFrontEr.length <= 0) throw new Error("Front Data Not Updated");
    res.status(200).send({ data: createFinalErBill });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

export default router;
