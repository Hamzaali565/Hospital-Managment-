import express from "express";
import { ConsultantChargesModel } from "../../dbRepo/ER/ConsultantChargesModel.mjs";

const router = express.Router();

router.post("/consultantCharges", async (req, res) => {
  try {
    const { partyName, consultantName, ratesData } = req.body;
    if (![partyName, consultantName].every(Boolean))
      throw new Error("Party Name and consultant Name is Requires Quantity.");
    let checkChild = false;
    for (const items of ratesData) {
      if (
        ![
          items.consultantCode,
          items.consultantName,
          items.rate,
          items.hospitalSharePercent,
          items.hospitalShareRuppees,
        ].every(Boolean)
      )
        checkChild = true;
    }
    if (checkChild === true)
      throw new Error("Parameters inside child is required.");
    const CheckDuplicate = await ConsultantChargesModel.find(
      { partyName, consultantName },
      "-_id partyName, consultantName"
    );
    if (CheckDuplicate.length > 0) throw new Error("Goto Edit Form");
    const createconsultantCharges = await ConsultantChargesModel.create({
      partyName,
      consultantName,
      ratesData,
    });
    res.status(200).send({ data: createconsultantCharges });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
export default router;
