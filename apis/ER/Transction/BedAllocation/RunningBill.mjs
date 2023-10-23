import express from "express";
import { consultantVisitModel } from "../../../../dbRepo/ER/TransactionModel/BedAllocation/ConsultantVisitModel.mjs";
import { InternalServicesModel } from "../../../../dbRepo/ER/TransactionModel/BedAllocation/InternalServicesModel.mjs";
import { LabServiceModel } from "../../../../dbRepo/ER/TransactionModel/BedAllocation/LabServiceModel.mjs";

const router = express.Router();
router.get("/errunningbill", async (req, res) => {
  try {
    const { erNo } = req.body;
    console.log(erNo);
    // /Consultant Visit
    const consultantVisitC = await consultantVisitModel.find({ erNo });
    let consultantCharges;
    if (consultantVisitC.length > 0) {
      consultantCharges = consultantVisitC[0].consultantVisit.map((items) => ({
        ConChar: items.charges,
      }));
      let totalConsultant = consultantCharges.reduce((a, b) => {
        return a + b.ConChar;
      }, 0);
    }

    // /Internal Services
    const serviceGiven = await InternalServicesModel.find(
      { erNo },
      "internalService"
    );
    const serviceCharges = serviceGiven[0].internalService.map((items) => ({
      charges: items.amount,
    }));
    let internalTotal = serviceCharges.reduce((a, b) => {
      return a + b.charges;
    }, 0);

    // / Lab Service
    const labServiceGiven = await LabServiceModel.find({ erNo }, "labService");
    console.log();
    const labCharges = labServiceGiven[0].labService.map((items) => ({
      charges: items.amount,
    }));
    console.log(labCharges);
    const labTotal = labCharges.reduce((a, b) => {
      return a + b.charges;
    }, 0);
    console.log(labTotal);
    res.status(200).send({ data: labCharges });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
export default router;
