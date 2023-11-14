import express from "express";
import { RadiologyChargesModel } from "../../../dbRepo/Radiology/Master/PartyChargesModel.mjs";
const router = express.Router();

router.post("/radiocharges", async (req, res) => {
  try {
    const { party, IPD, ER, parentService, serviceDetail, _id } = req.body;
    if (![party, IPD, ER, parentService, serviceDetail].every(Boolean))
      throw new Error("All Parameters Are Required");
    if (_id) {
      let editaCheck = await RadiologyChargesModel.find({ _id });
      if (editaCheck.length > 0) throw new Error("Switch to Edit.");
    }
    const ErrCheck = serviceDetail.map((items, i) => {
      if (![items.serviceCode, items.serviceName, items.charges].every(Boolean))
        throw new Error(`Service Detail ${i + 1} is Missing`);
    });
    const createData = await RadiologyChargesModel.create({
      party,
      IPD,
      ER,
      parentService,
      serviceDetail,
    });
    res.status(200).send({ data: createData });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

export default router;
