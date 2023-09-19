import express from "express";
import mongoose from "mongoose";
import { serviceModel } from "../../dbRepo/serviceModels.mjs";

const router = express.Router();

router.post("/addservice", async (req, res) => {
  try {
    let body = req.body;
    const { parentCode, childCode, parentName, childName } = body;
    if (![parentCode].every(Number))
      throw new Error("Parent Code Must Be In Number Format");
    if (![parentCode, parentName].every(Boolean))
      throw new Error("Parent Code and Parent Name Are Required");
    if (!childCode && !childName) {
      let create = await serviceModel.create({ parentCode, parentName });
      res.status(200).send({ message: "Parent Data Created Successfully" });
      console.log(create);
      return;
    } else if (![childCode].every(Number))
      throw new Error("Child Code Must Be in Number Format");
    else if (![childCode, childName].every(Boolean))
      throw new Error("Child Code And Child Name are required.");
    else {
      let create = await serviceModel.create({
        parentCode,
        childCode,
        parentName,
        childName,
      });
      res.status(200).send({ message: "Child Data Created Successfully" });
      console.log(create);
      return;
    }
  } catch (error) {
    res.status(400).send({ message: `${error.message}` });
  }
});

export default router;
