import express from "express";
import { LabServiceModel } from "../../../../dbRepo/ER/TransactionModel/BedAllocation/LabServiceModel.mjs";

const router = express.Router();
router.post("/labservices", async (req, res) => {
  try {
    const {
      erNo,
      mrNo,
      patientName,
      gender,
      partyCode,
      consultantName,
      labService,
      reqNo,
    } = req.body;
    const requiredParams = [
      "erNo",
      "mrNo",
      "patientName",
      "gender",
      "partyCode",
      "consultantName",
      "labService",
    ];

    for (const param of requiredParams) {
      if (req.body[param] === undefined) {
        throw new Error(`${param} is required.`);
      }
    }
    if (labService.length <= 0) throw new Error("labServices are required.");
    if (Object.keys(labService[0]).length <= 0)
      throw new Error("Please fill the first Line");
    const checkChild = await labService.map((items, i) => {
      if (
        ![items.testName, items.noOfTimes, items.charges, items.amount].every(
          Boolean
        )
      )
        throw new Error(`Empty Field / Error at line no. ${i + 1}`);
    });

    let duplicate = [];
    let unique = [];
    const duplicateCheck = await labService.forEach((items) => {
      if (unique.includes(items.testName)) {
        duplicate.push(items.testName);
      } else {
        unique.push(items.testName);
      }
    });
    if (duplicate.length > 0)
      throw new Error("Duplicate Tests Are Not Allowed");
    const lastReq = await LabServiceModel.find({}, "-_id reqNo", {
      sort: { reqNo: -1 },
      limit: 1,
    });
    console.log("lastReq", lastReq.length);
    const createLabServices = await LabServiceModel.create({
      erNo,
      mrNo,
      reqNo: lastReq.length > 0 ? lastReq[0].reqNo + 1 : 1,
      gender,
      partyCode,
      consultantName,
      patientName,
      labService,
    });
    res.status(200).send({ data: createLabServices });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

/// lab Status
router.get("/labstatus", async (req, res) => {
  try {
    const { erNo } = req.body;
    if (!erNo) throw new Error("ER No. id Required.");
    const testStatus = await LabServiceModel.findOne({ erNo });
    res.status(200).send({ data: testStatus });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.delete("/deletelabreq", async (req, res) => {
  try {
    const { id, mainId } = req.body;
    if (![id, mainId].every(Boolean)) throw new Error("Id is required");
    const compare = await LabServiceModel.findById({ _id: mainId });
    if (compare.length <= 0) throw new Error("Main Id not Found");
    const deleteTest = await LabServiceModel.findOneAndUpdate(
      { _id: mainId },
      { $pull: { labService: { _id: id } } },
      { new: true }
    );
    if (compare.labService.length === deleteTest.labService.length)
      throw new Error("data not Found, Kindly Check the Ids");
    res.status(200).send({ data: "Document Deleted Successfully" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

export default router;
