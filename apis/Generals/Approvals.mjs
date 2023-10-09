import express from "express";
import { ApprovalModel } from "../../dbRepo/ApprovalModel.mjs";

const router = express.Router();
router.post("/approvals", async (req, res) => {
  try {
    console.log(req.body);
    const { moduleName, department, formName, totalApprovals, users } =
      req.body;
    if (![moduleName, department, formName, totalApprovals].every(Boolean))
      throw new Error("All Parameters Are Required.");
    if (totalApprovals > 4)
      throw new Error("Total Approvals Cannot be greate than 4.");
    const checkDuplicate = await ApprovalModel.find(
      { moduleName, department },
      "moduleName department -_id"
    );
    let empFind = false;
    let LengthError = false;
    let itemLength = false;
    if (checkDuplicate.length > 0) throw new Error("Goto Edit form.");
    for (const items of users) {
      if (![items.userName, items.atLevel].every(Boolean)) empFind = true;
      if (items.atLevel > 4) LengthError = true;
      if (items.length > 16) itemLength = true;
    }
    if (empFind === true)
      throw new Error(
        "userName and Level is required parameters inside users Array"
      );
    if (itemLength === true)
      throw new Error("Only 16 users Are allowed in a module.");
    if (LengthError === true)
      throw new Error("Approval Level Number should be less than 4.");
    const createApprovals = await ApprovalModel.create({
      moduleName,
      department,
      formName,
      totalApprovals,
      users,
    });
    res.status(200).send({ data: createApprovals });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
export default router;
