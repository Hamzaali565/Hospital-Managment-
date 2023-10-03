import express from "express";
import { CostHeadModel } from "../../dbRepo/CostHeadModel.mjs";

const router = express.Router();

router.post("/addcosthead", async (req, res) => {
  try {
    const { code, name, status } = req.body;
    if (![code, name].every(Boolean))
      throw new Error("All parameters are required.");
    const CheckDuplicate = await CostHeadModel.find({ code }, "code -_id");
    console.log(CheckDuplicate);
    if (CheckDuplicate.length > 0)
      throw new Error("This Code is Already Taken");
    const CreateCostHead = await CostHeadModel.create({ code, name, status });
    res.status(200).send({ data: CreateCostHead });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
export default router;
