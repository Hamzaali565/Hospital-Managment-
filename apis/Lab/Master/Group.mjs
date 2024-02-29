import express from "express";
import { LabGroupModel } from "../../../dbRepo/Lab/Master/GroupModel.mjs";
const router = express.Router();

router.post("/labgroup", async (req, res) => {
  try {
    const { groupName, department, reportDays, status, groupDetails } =
      req.body;
    console.log({
      groupName,
      department,
      reportDays,
      status,
      groupDetails,
    });
    if (![groupName, department, reportDays, groupDetails].every(Boolean))
      throw new Error("All parameters are required 121.");
    if (groupDetails.length <= 0)
      throw new Error("Group Datails Are Compulsory.");
    //  checkng group details
    groupDetails.map((items, i) => {
      if (
        ![items.serialNo, items.testCode, items.testName, items._id].every(
          Boolean
        )
      )
        throw new Error(
          `All Parameters Are required in group details at line No. ${i + 1}.`
        );
    });
    let duplicate = [];
    let Unique = [];
    groupDetails.forEach((items) => {
      if (Unique.includes(items._id)) {
        duplicate.push(items._id);
      } else {
        Unique.push(items._id);
      }
    });
    if (duplicate.length > 0)
      throw new Error("Duplicate tests are not allowed.");
    const groupCodeData = await LabGroupModel.find({}, "groupCode", {
      sort: { groupCode: -1 },
      limit: 1,
    });
    console.log("groupCodeData", groupCodeData);
    let create = await LabGroupModel.create({
      groupCode: groupCodeData.length <= 0 ? 1 : groupCodeData[0].groupCode + 1,
      groupName,
      department,
      reportDays,
      groupDetails,
      status,
    });
    res.status(200).send({ message: "Data Created Successfully." });

    return;
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get("/getgroup", async (req, res) => {
  try {
    const { department } = req.query;
    if (!department) throw new Error("Department is Required");
    const group = await LabGroupModel.find(
      { department },
      "groupCode groupName department"
    );
    if (group.length <= 0) throw new Error("No Data Found against this Party.");
    res.status(200).send({ data: group });
    return;
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
export default router;
