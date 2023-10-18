import express from "express";
import { ERServicesModel } from "../../../dbRepo/ER/TransactionModel/ERServices.mjs";
import { Error } from "mongoose";

const router = express.Router();

router.post("/bedallocation", async (req, res) => {
  try {
    const {
      erNo,
      mrNo,
      patientName,
      gender,
      partyCode,
      consultantName,
      internalService,
      consultantVisit,
      labService,
      radiologyServices,
      medicineService,
    } = req.body;
    const Send = async (data) => {
      res.status(200).send({ data: data });
    };
    if (![erNo, mrNo, patientName, gender, partyCode].every(Boolean))
      throw new Error(
        `"erNo, mrNo, patientName, gender, partyCode" Are Required Parameters`
      );
    console.log("internalService[0].serviceName", internalService[0]);
    if (Object.keys(internalService[0]).length === 0)
      throw new Error("Make your to fill atleast 1 coloumn");
    const intCheck = await internalService.map((eachItems, index) => {
      if (
        ![
          eachItems.serviceName,
          eachItems.noOfTimes,
          eachItems.charges,
          eachItems.amount,
        ].every(Boolean)
      )
        throw new Error(`Some fields are empty at line no. ${index + 1}`);
    });
    const uniqueServiceNames = [];
    const duplicateServiceNames = [];

    internalService.forEach((item) => {
      if (uniqueServiceNames.includes(item.serviceName)) {
        // If the service name is already in the uniqueServiceNames array, it's a duplicate
        duplicateServiceNames.push(item.serviceName);
      } else {
        // Otherwise, it's unique, so add it to the uniqueServiceNames array
        uniqueServiceNames.push(item.serviceName);
      }
    });
    if (duplicateServiceNames.length > 0)
      throw new Error("Duplicate Services Are Not Allowed.");
    const createInternalService = await ERServicesModel.create({
      erNo,
      mrNo,
      patientName,
      gender,
      partyCode,
      internalService,
    });
    if (createInternalService) {
      await Send(createInternalService);
      return;
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

export default router;
