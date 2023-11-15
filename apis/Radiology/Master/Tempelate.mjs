import express from "express";
import { TempelateModel } from "../../../dbRepo/Radiology/Master/TemplateModel.mjs";

const router = express.Router();

router.post("/radiotemplate", async (req, res) => {
  try {
    const { reportName, serviceName, serviceCode, template, _id } = req.body;
    if (![reportName, serviceName, serviceCode, template].every(Boolean))
      throw new Error("All Parameters are required.");
    if (_id) {
      const editCheck = await TempelateModel.find({ _id });
      if (editCheck.length > 0) throw new Error("Switch To Edit Mode!!!");
    }
    const createTemplate = await TempelateModel.create({
      reportName,
      serviceName,
      serviceCode,
      template,
    });
    res.status(200).send({ data: createTemplate });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
export default router;
