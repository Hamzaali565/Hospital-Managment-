import express from "express";
import { CostCenterModel } from "../../dbRepo/CostCenterModel.mjs";

const router = express.Router();

router.post("/addcostcenter", async (req, res) => {
  try {
    const { code, name, remarks, status } = req.body;
    if (![code, name, status].every(Boolean))
      throw new Error("All parameters are required.");
    const duplicateCheck = await CostCenterModel.find({ code }, "code -_id");
    if (duplicateCheck.length > 0)
      throw new Error("Thid Code is Already Taken");
    const CreateCostCenter = await CostCenterModel.create({
      code,
      name,
      status,
      remarks,
    });
    res.status(201).send({
      message: `New cost center created successfully`,
      data: { CreateCostCenter },
    });
    return;
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

export default router;
