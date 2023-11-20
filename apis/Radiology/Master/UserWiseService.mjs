import express from "express";
import { UserWiseServiceModel } from "../../../dbRepo/Radiology/Master/UserWiseServiceModel.mjs";

const router = express.Router();

router.post("/userwiseservice", async (req, res) => {
  try {
    const { serviceCode, serviceName, usersDetails, _id } = req.body;
    if (![serviceCode, serviceName, usersDetails].every(Boolean))
      throw new Error("All Parameters Are Required.");
    usersDetails.map((items, i) => {
      if (![items.userName].every(Boolean))
        throw new Error(`UserName is Required at Line No. ${i + 1}`);
    });
    let duplicate = [];
    let unique = [];
    usersDetails.forEach((items, i) => {
      if (unique.includes(items.userName)) {
        duplicate.push(items.userName);
      } else {
        unique.push(items.userName);
      }
    });
    if (duplicate.length > 0)
      throw new Error(`Duplicate UserNames are not Allow.`);
    if (_id) {
      const EditCheck = await UserWiseServiceModel.find({ _id });
      if (EditCheck.length > 0) throw new Error("Switch To Edit.");
    }
    const createData = await UserWiseServiceModel.create({
      serviceCode,
      serviceName,
      usersDetails,
    });
    res.status(200).send({ data: createData });
  } catch (error) {
    res.status(300).send({ message: error.message });
  }
});
export default router;
