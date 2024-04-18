import express from "express";
import { RecieptTypeModel } from "../../dbRepo/RecieptTypeModel.mjs";

const router = express.Router();

router.post("/paymentreciept", async (req, res) => {
  try {
    let { name, status } = req.body;
    if (!name) throw new Error("Reciept Name is Required.");
    let createRecieptType = await RecieptTypeModel.create({ name, status });
    res.status(200).send({ data: createRecieptType });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get("/paymentreciept", async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) throw new Error("Name of the reciept type is required");
    const response = await RecieptTypeModel.find({
      name: { $regex: new RegExp(name, "i") },
      status: true,
    });
    if (response.length <= 0)
      throw new Error(`No reciept types found with ${name}`);
    else return res.json({ data: response });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

export default router;
