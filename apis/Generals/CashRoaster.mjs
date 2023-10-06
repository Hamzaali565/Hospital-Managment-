import express from "express";
import { CashRoasterModel } from "../../dbRepo/CashRoasterModel.mjs";
const router = express.Router();
router.post("/cashroaster", async (req, res) => {
  try {
    const { name, cashLocation, receiptType } = req.body;
    const { description, status, paymentType } = receiptType[0];
    if (![name, cashLocation].every(Boolean))
      throw new Error("UserName And CashLocation is Required.");
    let ArrayCheck = true;
    for (const items of receiptType) {
      if (![items.description, items.paymentType].every(Boolean))
        ArrayCheck = false;
      break;
    }
    if (ArrayCheck === false)
      throw new Error("Description and Payment Type is required");
    const getRoaster = await CashRoasterModel.find({ name, cashLocation });
    console.log("getRoaster", getRoaster.length);
    if (getRoaster.length > 0) {
      const UpdateRoaster = await CashRoasterModel.findOneAndUpdate(
        { name, cashLocation },
        { receiptType },
        { new: true }
      );
      console.log("UpdateRoaster", UpdateRoaster);
      res.status(200).send({ message: "Data updated", data: UpdateRoaster });
      return;
    }
    const createRoaster = await CashRoasterModel.create({
      name,
      cashLocation,
      receiptType,
    });
    res.status(200).send({
      data: createRoaster,
    });
    console.log(description);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
export default router;
