import express from "express";
import { testModel } from "../../../dbRepo/Lab/Master/TestModel.mjs";

const router = express.Router();

// test creation

router.post("/labtest", async (req, res) => {
  try {
    const {
      testCode,
      _id,
      testName,
      department,
      category,
      reportDays,
      testType,
      style,
      testRanges,
    } = req.body;
    if (
      ![testName, department, category, reportDays, testType, testRanges].every(
        Boolean
      )
    )
      throw new Error("All Parameters are required.");
    let e = testRanges.map((items, i) => {
      if (
        ![
          items.equipment,
          items.gender,
          items.fromAge,
          items.toAge,
          items.ageType,
        ].every(Boolean)
      )
        throw new Error(`Some infromation missing at line no ${i + 1}`);
    });
    const uniqueSet = new Set();
    const duplicates = [];

    testRanges.forEach((item, index) => {
      const key = `${item.gender}-${item.fromAge}-${item.toAge}-${item.ageType}`;

      if (uniqueSet.has(key)) {
        duplicates.push({ index, item });
      } else {
        uniqueSet.add(key);
      }
    });

    console.log("Unique Data:", Array.from(uniqueSet.values()));
    console.log("Duplicates:", duplicates);
    if (duplicates.length > 0)
      throw new Error(
        `Duplication of ages found at line no. ${duplicates[0].index + 1}`
      );
    //find edit data
    const ifEdit = await testModel.find({ _id });
    if (ifEdit.length > 0) throw new Error("Switch to Edit Mode.");
    //find last code
    const findCode = await testModel.find({}, "testCode", {
      sort: { testCode: -1 },
      limit: 1,
    });
    console.log("testCode", findCode);
    //create data
    const createTest = await testModel.create({
      testCode: findCode.length <= 0 ? 1 : findCode[0].testCode + 1,
      testName,
      department,
      category,
      reportDays,
      testType,
      style,
      testRanges,
    });
    res.status(200).send({ message: "Test Has Been Created Successfully." });
  } catch (error) {
    console.log("Error", error);
    res.status(400).send({ message: error.message });
  }
});

// department wise tests
router.get("/gettest", async (req, res) => {
  try {
    const { department } = req.query;
    console.log("department", department);
    if (!department) {
      const tests = await testModel.find({}, "-testRanges");
      console.log("test", tests);
      if (tests.length <= 0)
        throw new Error("No Data Found Against This Department.");
      res.status(200).send({ data: tests });
      return;
    } else {
      const tests = await testModel.find(
        { department },
        "testCode testName department category"
      );
      console.log("test", tests);
      if (tests.length <= 0)
        throw new Error("No Data Found Against This Department.");
      res.status(200).send({ data: tests });
      return;
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

export default router;
