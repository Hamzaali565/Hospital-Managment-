import express from "express";
import { LabChargesModel } from "../../../dbRepo/Lab/Master/LabChargesModel.mjs";

const router = express.Router();

router.post("/labcharges", async (req, res) => {
  try {
    const { party, party_id, testsPrice } = req.body;
    if (!party || !party_id || !testsPrice)
      throw new Error("All Parameters Are Required.");
    if (testsPrice.length <= 0) throw new Error("testPrice is required.");
    testsPrice.map((item, index) => {
      if (
        ![item.code, item.name, item.price, item.status, item._id].every(
          Boolean
        )
      )
        throw new Error(`Some details are missing at line No. ${index + 1} `);
      return;
    });
    let duplicate = [];
    let Unique = [];
    testsPrice.forEach((items) => {
      if (Unique.includes(items._id)) {
        duplicate.push(items._id);
      } else {
        Unique.push(items._id);
      }
    });
    if (duplicate.length > 0)
      throw new Error("Duplicate Tests Are not Allowed.");
    let findPreData = await LabChargesModel.find({ party_id, party });
    if (findPreData.length > 0) {
      const updatePreData = await LabChargesModel?.findOneAndUpdate(
        { party, party_id },
        { $push: { testsPrice } },
        { new: true }
      );
      res.status(200).send({ UpdatedData: updatePreData });
      return;
    }

    const createLabCharges = await LabChargesModel.create({
      party,
      party_id,
      testsPrice,
    });
    res.status(200).send({ message: createLabCharges });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

//get lab charges

router.get("/getlabcharges", async (req, res) => {
  try {
    const { party, party_id } = req.query;
    if ((!party, !party_id)) throw new Error("All Parameters Are Required.");
    const data = await LabChargesModel.find({ party, party_id });
    if (data.length <= 0) throw new Error("Data not found against This Party");

    res.status(200).send({ data });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

export default router;
