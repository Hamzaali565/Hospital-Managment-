import express from "express";
import { PaymentModel } from "../../dbRepo/PaymentModel.mjs";

const router = express.Router();

router.post("/paymentterm", async (req, res) => {
  try {
    const { code, description } = req.body;
    if (![code, description].every(Boolean))
      throw new Error("All Parameters Are Required.");
    const duplicateCheck = await PaymentModel.find({ code }, "code");
    if (duplicateCheck.length > 0)
      throw new Error("This Code is Already Taken");
    const CreatePayment = await PaymentModel.create({ code, description });
    res.status(201).json(CreatePayment);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

export default router;
