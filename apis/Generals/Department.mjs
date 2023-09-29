import express from "express";
import { DepartmentModel } from "../../dbRepo/DepartmentModel.mjs";

const router = express.Router();

router.post("/departmentadd", async (req, res) => {
  try {
    const { departmentCode, departmentName, status } = req.body;
    if (![departmentCode, departmentName, status].every(Boolean))
      throw new Error("All Parameters Are Required");
    const checkDuplicate = await DepartmentModel.find(
      { departmentCode },
      "departmentCode -_id"
    );
    console.log(checkDuplicate.length);
    if (checkDuplicate.length > 0)
      throw new Error("This Code is Already Taken");
    const createDep = await DepartmentModel.create({
      departmentCode,
      departmentName,
      status,
    });
    res.status(200).send({ data: createDep });
    return;
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
export default router;
