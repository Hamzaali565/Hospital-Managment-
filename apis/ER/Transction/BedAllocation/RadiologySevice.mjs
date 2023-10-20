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
export default router;
