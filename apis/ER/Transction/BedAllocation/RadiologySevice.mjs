import express from "express";
import { RadiologyServiceModel } from "../../../../dbRepo/ER/TransactionModel/BedAllocation/RadiologyServicesModel.mjs";

const router = express.Router();

router.post("/radiologyservice", async (req, res) => {
  try {
    const { erNo, mrNo, patientName, gender, partyCode, radiologyService } =
      req.body;
    if (
      ![erNo, mrNo, patientName, gender, partyCode, radiologyService].every(
        Boolean
      )
    )
      throw new Error("All Params Are Required");
    console.log("ok");
    if (radiologyService.length <= 0)
      throw new Error("RadiologyService is Required.");
    if (Object.keys(radiologyService[0]).length <= 0)
      throw new Error("Please Fill the First raw.");
    const childCheck = await radiologyService.map((items, i) => {
      if (![items.testName, items.charges].every(Boolean))
        throw new Error(`Empty Field / Error found at line no. ${i + 1}`);
    });
    let duplicate = [];
    let unique = [];
    const duplicateCheck = await radiologyService.forEach((items) => {
      if (unique.includes(items.testName)) {
        duplicate.push(items.testName);
      } else {
        unique.push(items.testName);
      }
      if (duplicate.length > 0)
        throw new Error("Duplicate Tests Are Not Allowed.");
    });
    const createRadiologyService = await RadiologyServiceModel.create({
      erNo,
      mrNo,
      patientName,
      gender,
      partyCode,
      radiologyService,
    });
    return res.status(200).send({ data: createRadiologyService });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

///Test Status
router.get("/radstatus", async (req, res) => {
  try {
    const { erNo } = req.body;
    if (!erNo) throw new Error("ER No. id Required.");
    const testStatus = await RadiologyServiceModel.findOne({ erNo });
    res.status(200).send({ data: testStatus });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.delete("/deleteradioreq", async (req, res) => {
  try {
    const { id, mainId } = req.body;
    if (![id, mainId].every(Boolean)) throw new Error("Id/mainId is required");
    const compare = await RadiologyServiceModel.find({ _id: mainId });
    console.log(compare);
    if (compare.length <= 0) throw new Error("Main Id Not Found");
    const deleteReq = await RadiologyServiceModel.findOneAndUpdate(
      { _id: mainId },
      { $pull: { radiologyService: { _id: id } } },
      { new: true }
    );
    if (
      compare[0].radiologyService.length === deleteReq.radiologyService.length
    )
      throw new Error("Data Not Deleted Kindly check the Id(s)");
    res.status(200).send({ data: deleteReq });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

export default router;
