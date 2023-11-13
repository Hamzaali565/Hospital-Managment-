import express from "express";
import { consultantVisitModel } from "../../../../dbRepo/ER/TransactionModel/BedAllocation/ConsultantVisitModel.mjs";
import { InternalServicesModel } from "../../../../dbRepo/ER/TransactionModel/BedAllocation/InternalServicesModel.mjs";
import { LabServiceModel } from "../../../../dbRepo/ER/TransactionModel/BedAllocation/LabServiceModel.mjs";
import { medicineServiceModel } from "../../../../dbRepo/ER/TransactionModel/BedAllocation/MedicineServiceModel.mjs";
import { RadiologyServiceModel } from "../../../../dbRepo/ER/TransactionModel/BedAllocation/RadiologyServicesModel.mjs";
import { FrontRegModel } from "../../../../dbRepo/ER/TransactionModel/ERFrontRegModel.mjs";

const router = express.Router();
router.get("/errunningbill", async (req, res) => {
  try {
    const { erNo } = req.body;
    if (!erNo) throw new Error("ER No. is Required.");
    console.log(erNo);

    // check ER No.
    const checkER = await FrontRegModel.find({ erRegNo: erNo });
    if (checkER.length <= 0) throw new Error("ER No. not found");
    const PatientData = checkER.map((items) => ({
      party: items.partyCode,
      mrNo: items.mrNo,
      wardType: items.wardType,
      bedNo: items.bedNo,
      patientName: items.patientName,
      contactNo: items.cellNo,
      gender: items.gender,
      dutyDoctor: items.dutyDoctor,
      dutyStaff: items.dutyStaff,
    }));
    console.log("PatientData", PatientData);
    // /Consultant Visit
    const consultantVisitC = await consultantVisitModel.find({ erNo });
    let totalConsultant;
    let consultantCharges;
    console.log("consultantCharges", consultantVisitC);

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
    const serviceGiven = await InternalServicesModel.find({ erNo });
    let internalTotal;
    let serviceCharges;
    if (serviceGiven.length > 0) {
      serviceCharges = serviceGiven[0].internalService.map((items) => ({
        charges: items.amount,
        serviceName: items.serviceName,
        NoOFTimes: items.noOfTimes,
        Charge: items.charges,
      }));
      internalTotal = serviceCharges.reduce((a, b) => {
        return a + b.charges;
      }, 0);
      serviceCharges.push({ Total: internalTotal });
    }
    console.log("internalTotal", internalTotal);

    // / Lab Service
    const labServiceGiven = await LabServiceModel.find({ erNo });
    let labTotal;
    let labCharges;
    if (labServiceGiven.length > 0) {
      labCharges = labServiceGiven[0].labService.map((items) => ({
        charges: items.amount,
        testName: items.testName,
        charge: items.charges,
        noOfTimes: items.noOfTimes,
      }));
      //   console.log(labCharges);
      labTotal = labCharges.reduce((a, b) => {
        return a + b.charges;
      }, 0);
      labCharges.push({ Total: labTotal });
    }
    console.log("labTotal", labTotal);

    // /Medicine Services
    const medicineServiceGiven = await medicineServiceModel.find({ erNo });
    let totalMedicineAmount;
    let medicineCharges;
    if (medicineServiceGiven.length > 0) {
      medicineCharges = medicineServiceGiven[0].medicineService.map(
        (items) => ({
          drugName: items.medicineName,
          quantity: items.quantity,
        })
      );

      totalMedicineAmount = medicineCharges.reduce((a, b) => {
        return a + b.charges;
      }, 0);
      medicineCharges.push({ Total: totalMedicineAmount });
    }
    console.log("totalMedicineAmount", totalMedicineAmount);

    // /Radiology Service
    const radiologyServiceGiven = await RadiologyServiceModel.find({ erNo });
    let totalRadiology;
    let radiologyCharges;
    if (radiologyServiceGiven.length > 0) {
      radiologyCharges = radiologyServiceGiven[0].radiologyService.map(
        (items) => ({
          charges: items.charges,
          serviceType: items.testName,
          charge: items.charges,
        })
      );
      totalRadiology = radiologyCharges.reduce((a, b) => {
        return a + b.charges;
      }, 0);
      radiologyCharges.push({ Total: totalRadiology });
    }
    console.log("totalRadiology", totalRadiology);

    let GrandTotal =
      totalConsultant + totalRadiology + labTotal + internalTotal;
    res.status(200).send({
      data: {
        PatientData,
        labCharges,
        serviceCharges,
        consultantCharges,
        medicineCharges,
        radiologyCharges,
        GrandTotal,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});
export default router;
