import express from "express";
import { WardChargesModel } from "../../dbRepo/ER/WardChargesModel.mjs";
const router = express.Router();

router.post("/wardCharges", async (req, res) => {
  try {
    const { partyName, wardName, rates } = req.body;
    if (![partyName, wardName].every(Boolean))
      throw new Error("Party Name and Ward Name is Required");
    let checkChild = false;
    for (const items of rates) {
      if (![items.wardLocation, items.bedNo, items.bedAmount].every(Boolean))
        checkChild = true;
    }
    if (checkChild === true)
      throw new Error("parameters inside child is required.");
    const checkDuplicate = await WardChargesModel.find(
      { partyName, wardName },
      "-_id partyName wardName"
    );
    if (checkDuplicate.length > 0) throw new Error("Goto Edit Form");
    const createWardCharges = await WardChargesModel.create({
      partyName,
      wardName,
      rates,
    });
    res.status(200).send({ data: createWardCharges });
    return;
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
export default router;
