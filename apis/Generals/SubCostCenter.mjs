import express from "express";
import { SubCostModel } from "../../dbRepo/SubCostCenterModel.mjs";
import { CostCenterModel } from "../../dbRepo/CostCenterModel.mjs";

const router = express.Router();

router.post("/addsub", async (req, res) => {
  try {
    const { costCode, costName, subCode, subName, remarks, status } = req.body;
    if (![costCode, costName, subCode, subName, status].every(Boolean))
      throw new Error("All Parameters Are Required");
    const CheckCostCenter = await CostCenterModel.find(
      { code: costCode, name: costName },
      "code name -_id"
    );
    console.log(CheckCostCenter);
    if (CheckCostCenter.length <= 0)
      throw new Error(
        "Cost Center Not Found. Please Provide Correct info about Cost Center"
      );
    const checkDuplicate = await SubCostModel.find({ subCode }, "subCode -_id");
    if (checkDuplicate.length > 0)
      throw new Error("This Code of Sub Cost Center is Already Taken");
    const CreateSubCost = await SubCostModel.create({
      costCode,
      costName,
      subCode,
      subName,
      remarks,
      status,
    });
    res.status(200).send({ data: CreateSubCost });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

export default router;
