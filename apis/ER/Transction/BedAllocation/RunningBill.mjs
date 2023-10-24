import express from "express";
import { consultantVisitModel } from "../../../../dbRepo/ER/TransactionModel/BedAllocation/ConsultantVisitModel.mjs";
import { InternalServicesModel } from "../../../../dbRepo/ER/TransactionModel/BedAllocation/InternalServicesModel.mjs";
import { LabServiceModel } from "../../../../dbRepo/ER/TransactionModel/BedAllocation/LabServiceModel.mjs";
import { medicineServiceModel } from "../../../../dbRepo/ER/TransactionModel/BedAllocation/MedicineServiceModel.mjs";
import { RadiologyServiceModel } from "../../../../dbRepo/ER/TransactionModel/BedAllocation/RadiologyServicesModel.mjs";

const router = express.Router();
router.get("/errunningbill", async (req, res) => {
  try {
    const { erNo } = req.body;
    console.log(erNo);
    // /Consultant Visit
    const consultantVisitC = await consultantVisitModel.find({ erNo });
    let totalConsultant;
    let consultantCharges;
    if (consultantVisitC.length > 0) {
      consultantCharges = consultantVisitC.map((items) => ({
        ConChar: items.consultantVisit[0].charges,
        consultantName: items.consultantVisit[0].consultantName,
      }));
      totalConsultant = consultantCharges.reduce((a, b) => {
        return a + b.ConChar;
      }, 0);
      consultantCharges.push({ Total: totalConsultant });
      console.log("consultantCharges", consultantCharges);
    }
    console.log("totalConsultant", totalConsultant);
    // /Internal Services
    const serviceGiven = await InternalServicesModel.find(
      { erNo },
      "internalService"
    );
    let internalTotal;
    if (serviceGiven.length > 0) {
      const serviceCharges = serviceGiven[0].internalService.map((items) => ({
        charges: items.amount,
      }));
      internalTotal = serviceCharges.reduce((a, b) => {
        return a + b.charges;
      }, 0);
    }
    console.log("internalTotal", internalTotal);
    // / Lab Service
    const labServiceGiven = await LabServiceModel.find({ erNo }, "labService");
    let labTotal;
    if (labServiceGiven.length > 0) {
      const labCharges = labServiceGiven[0].labService.map((items) => ({
        charges: items.amount,
      }));
      //   console.log(labCharges);
      labTotal = labCharges.reduce((a, b) => {
        return a + b.charges;
      }, 0);
    }
    console.log("labTotal", labTotal);

    // /Medicine Services
    const medicineServiceGiven = await medicineServiceModel.find({ erNo });
    let totalMedicineAmount;
    if (medicineServiceGiven.length > 0) {
      const medicineCharges = medicineServiceGiven[0].medicineService.map(
        (items) => ({
          charges: items.amount,
        })
      );

      totalMedicineAmount = medicineCharges.reduce((a, b) => {
        return a + b.charges;
      }, 0);
    }
    console.log("totalMedicineAmount", totalMedicineAmount);

    // /Radiology Service
    const radiologyServiceGiven = await RadiologyServiceModel.find({ erNo });
    let totalRadiology;
    if (radiologyServiceGiven.length > 0) {
      let radiologyCharges = radiologyServiceGiven[0].radiologyService.map(
        (items) => ({
          charges: items.charges,
        })
      );
      totalRadiology = radiologyCharges.reduce((a, b) => {
        return a + b.charges;
      }, 0);
    }
    console.log("totalRadiology", totalRadiology);

    let GrandTotal =
      totalConsultant + totalRadiology + labTotal + internalTotal;
    res.status(200).send({
      data: {
        labTotal,
        internalTotal,
        consultantCharges,
        totalMedicineAmount,
        totalRadiology,
        GrandTotal,
      },
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
export default router;
