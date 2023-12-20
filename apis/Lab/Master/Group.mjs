import express from "express";
import { LabGroupModel } from "../../../dbRepo/Lab/Master/GroupModel.mjs";
const router = express.Router();

router.post("/labgroup", async (req, res) => {
  try {
    const {
      groupCode,
      groupName,
      department,
      reportDays,
      status,
      groupDetails,
    } = req.body;
    if (
      ![groupName, department, reportDays, groupDetails, status].every(Boolean)
    )
      throw new Error("All parameters are required.");
    //  checkng group details
    groupDetails.map((items, i) => {
      if (
        ![
          items.serialNo,
          items.testCode,
          items.testName,
          items.rangesDetails,
          items.test_id,
        ].every(Boolean)
      )
        throw new Error(
          `All Parameters Are required in group details at line No. ${i + 1}.`
        );
    });
    let duplicate = [];
    let Unique = [];
    groupDetails.foreach((items) => {
      if (Unique.includes(items.test_id)) {
        duplicate.push(items.test_id);
      } else {
        Unique.push(items.test_id);
      }
    });
    if (duplicate.length > 0)
      throw new Error("Duplicate tests are not allowed.");
    let create = await LabGroupModel.create({
      groupCode,
      groupName,
      department,
      reportDays,
      groupDetails,
      status,
    });
    res.status(400).send({ message: "Data Created Successfully." });

    return;
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
