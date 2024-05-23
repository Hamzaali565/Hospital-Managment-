import express from "express";
import { LabRegisteraionModel } from "../../../dbRepo/Lab/Transaction/LabRegistrationModel.mjs";
import { testModel } from "../../../dbRepo/Lab/Master/TestModel.mjs";
import { LabGroupModel } from "../../../dbRepo/Lab/Master/GroupModel.mjs";

const router = express.Router();

router.post("/labregistration", async (req, res) => {
  // console.log(req.body);
  try {
    const {
      mrData,
      consultantName,
      consultantCode,
      remarks,
      partyName,
      partyCode,
      shiftNo,
      test,
      createdUser,
      receiptLocation,
      receiptType,
      referalNo,
      totalAmount,
      bankName,
    } = req.body;

    if (
      ![
        mrData,
        consultantName,
        consultantCode,
        remarks,
        partyName,
        partyCode,
        shiftNo,
        test,
        createdUser,
        receiptLocation,
        receiptType,
      ].every(Boolean)
    )
      throw new Error("All fields Are Required");

    console.log("line number 43", test);
    const newData = await Promise.all(
      test.map(async (item) => {
        const regularData = await testModel.findById(
          item.test_id,
          "department"
        );
        return regularData;
      })
    );
    console.log("New Data", newData);

    test.forEach((obj2) => {
      const match = newData.find(
        (obj1) => obj1._id.toString() === obj2.test_id.toString()
      );
      if (match) {
        obj2.department = match.department;
      }
    });

    const createdLabRegisttraion = await LabRegisteraionModel.create({
      mrData,
      consultantName,
      consultantCode,
      remarks,
      partyName,
      partyCode,
      shiftNo,
      test,
      createdUser,
      receiptLocation,
      receiptType,
      bankName,
      referalNo,
      totalAmount,
    });
    res.status(200).send({ data: createdLabRegisttraion });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// get all untagged tests
router.get("/bookedtests", async (req, res) => {
  try {
    const response = await LabRegisteraionModel.find({}).populate("test");
    let filterData = response.map((item) => ({
      ...item.toObject(),
      test: item.test.filter((testItem) => testItem.tagType !== true),
    }));
    res.status(200).send({ data: filterData });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// update the status of lab registration
router.put("/updatestatus", async (req, res) => {
  try {
    console.log(req.query);
    const { _id, test_id, status } = req.query;
    if (![_id, test_id, status].every(Boolean))
      throw new Error("All Parameters Are Required");
    console.log("id", _id);
    console.log("test_id", test_id);
    const response = await LabRegisteraionModel.findOneAndUpdate(
      {
        _id: _id,
        "test._id": test_id,
      },
      { $set: { "test.$.tagType": status } },
      { new: true } // return updated doc
    );
    // console.log("response", response);
    res.status(200).send({ data: response });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get("/labregwise", async (req, res) => {
  try {
    const { labNo } = req.query;
    if (!labNo) throw new Error("Lab No. is required!!");
    const response = await LabRegisteraionModel.find({ labNo });
    if (response.length <= 0)
      throw new Error("No data found against this Lab No.");
    let filterData = response.map((items) => ({
      ...items.toObject(),
      test: items.test.filter(
        (testItem) =>
          testItem.tagType !== false && testItem.resultEntry !== true
      ),
    }));
    if (filterData[0].test.length <= 0)
      throw new Error("This Test is Untagged OR Result Already Entered");
    res.status(200).send({ data: filterData });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// get ranges and group details
router.get("/getranges", async (req, res) => {
  try {
    const { test_id, age } = req.query;
    if (!test_id || !age) throw new Error("Test Id / Age is required!!");

    const responseTest = await testModel.findOne({ _id: test_id }).lean(); // Use lean() to get a plain JS object

    if (responseTest) {
      const rangeObject = responseTest.testRanges.find(
        (range) => age >= range?.fromAge && age <= range?.toAge
      );

      if (rangeObject) {
        // Create a new object with the filtered range
        const filteredResponse = {
          ...responseTest,
          testRanges: [rangeObject],
        };

        return res.status(200).send({ data: [filteredResponse] });
      } else {
        throw new Error("Kindly check ranges properly.");
      }
    }

    const responseGroup = await LabGroupModel.findOne({ _id: test_id }).lean();
    return res.status(200).send({ dataG: responseGroup });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

export default router;
