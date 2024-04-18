import express from "express";
import { cashCollectingModel } from "../../dbRepo/CashCollectingModel.mjs";

const router = express.Router();

router.post("/cashlocation", async (req, res) => {
  try {
    const { name, status } = req.body;
    if (![name, status].every(Boolean))
      throw new Error("All Parameters Are Required");
    const response = await cashCollectingModel.create({
      name,
      status,
    });
    res
      .status(201)
      .json({ message: `New Cash Location Created`, data: response });
  } catch (error) {
    res.status(400).send({ message: `${error.message}` });
  }
});

router.get("/cashlocation", async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) throw new Error("Name is required");
    const response = await cashCollectingModel.find({
      name: { $regex: new RegExp(name, "i") },
    });
    res.status(201).json({ data: response });
  } catch (error) {
    res.status(400).send({ message: `${error.message}` });
  }
});
export default router;
