import express from "express";
import { ServiceChargesModel } from "../../dbRepo/ER/ServiceChargesModel.mjs";

const router = express.Router();

router.post("/servicecharges", async (req, res) => {
  try {
    const { wardName, partyName, parentService, serviceData } = req.body;
    if (![wardName, partyName, parentService].every(Boolean))
      throw new Error("All Parameters Are Required.");
    const checkDuplicate = await ServiceChargesModel.find({
      wardName,
      partyName,
      parentService,
    });
    if (checkDuplicate.length > 0) throw new Error("Goto Edit Form");
    let serviceDataCheck = false;
    for (const items of serviceData) {
      if (
        ![items.serviceCode, items.serviceName, items.serviceRate].every(
          Boolean
        )
      )
        serviceDataCheck = true;
    }
    if (serviceDataCheck === true)
      throw new Error("Parameters inside service Data are required.");
    const createServiceCharges = await ServiceChargesModel.create({
      wardName,
      partyName,
      parentService,
      serviceData,
    });
    res.status(200).send({ data: createServiceCharges });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

export default router;
