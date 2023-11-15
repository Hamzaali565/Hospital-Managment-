import express from "express";
import { ConsultantUserMappingModel } from "../../../dbRepo/Radiology/Master/ConsultantUserMappingModel.mjs";

const router = express.Router();

router.post("/radiomapping", async (req, res) => {
  try {
    const {
      spreciality,
      consultant,
      roomNo,
      user,
      address,
      cellNo,
      email,
      _id,
    } = req.body;
    if (![spreciality, consultant, roomNo, user].every(Boolean))
      throw new Error("All Parameters are required.");
    if (_id) {
      const ConsultantCheck = await ConsultantUserMappingModel.find({ _id });
      if (ConsultantCheck.length > 0) throw new Error("Switch To Edit Mode!!!");
    }
    const ConsultantUserMapping = await ConsultantUserMappingModel.create({
      spreciality,
      consultant,
      roomNo,
      user,
      address,
      cellNo,
      email,
    });
    res.status(200).send({ data: ConsultantUserMapping });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
export default router;
