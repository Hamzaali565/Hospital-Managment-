import express from "express";
import { cashCollectingModel } from "../../dbRepo/CashCollectingModel.mjs";

const router = express.Router();

router.post("/cashlocation", async (req, res) => {
  try {
    const { code, description } = req.body;
    if (![code, description].every(Boolean))
      throw new Error("All Parameters Are Required");
    const response = await cashCollectingModel.create({ code, description });
    res
      .status(201)
      .json({ message: `New Cash Location Created`, data: response });
  } catch (error) {
    res.status(400).send({ message: `${error.message}` });
  }
});
export default router;
