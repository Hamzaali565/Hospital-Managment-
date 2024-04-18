import express from "express";
import { LabChargesModel } from "../../../dbRepo/Lab/Master/LabChargesModel.mjs";

const router = express.Router();

router.post("/labcharges", async (req, res) => {
  console.log("body", req.body);
  try {
    const { party, party_id, testsPrice } = req.body;
    if (!party || !party_id || !testsPrice)
      throw new Error("All Parameters Are Required.");
    if (testsPrice.length <= 0) throw new Error("testPrice is required.");
    let d2 = testsPrice.filter((item) => item.hasOwnProperty("price"));
    console.log("d2", d2);
    // testsPrice.map((item, index) => {
    //   if (
    //     ![
    //       item.testCode,
    //       item.testName,
    //       item.price,
    //       item.status,
    //       item._id,
    //     ].every(Boolean)
    //   )
    //     throw new Error(`Some details are missing at line No. ${index + 1} `);
    //   return;
    // });
    let duplicate = [];
    let Unique = [];
    d2.forEach((items) => {
      if (Unique.includes(items._id)) {
        duplicate.push(items._id);
      } else {
        Unique.push(items._id);
      }
    });
    if (duplicate.length > 0)
      throw new Error("Duplicate Tests Are not Allowed.");
    // let c = d2.map(({ _id, ...rest }) => rest);
    let c = d2;
    // .map((item) => ({
    //   ...item,
    //   testCode: item.testCode.toString(),
    // }));
    // console.log("d2 at 39", c);
    let findPreData = await LabChargesModel.find({ party_id, party });

    if (findPreData.length > 0) {
      const updatePreData = await LabChargesModel?.findOneAndUpdate(
        { party, party_id },
        { $push: { c } },
        { new: true }
      );
      console.log("UpdatedData", updatePreData);
      res.status(200).send({ UpdatedData: updatePreData });
      return;
    }

    const createLabCharges = await LabChargesModel.create({
      party,
      party_id,
      c,
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
    console.log(req.query);
    if ((!party, !party_id)) throw new Error("All Parameters Are Required.");
    const data = await LabChargesModel.find({ party, party_id });

    console.log("data", data);
    if (data.length <= 0) throw new Error("Data not found against This Party");

    res.status(200).send({ data });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// lab charges new

router.post("/labchargesnew", async (req, res) => {
  try {
    console.log("req.body", req.body);
    const { party, party_id, testsPrice } = req.body;
    if (!party || !party_id || !testsPrice)
      throw new Error("All Parameters Are Required.");
    if (testsPrice.length <= 0) throw new Error("testPrice is required.");
    // update
    let findPreData = await LabChargesModel.find({ party_id, party });
    console.log("Tests Price:", testsPrice);

    let d2 = testsPrice.filter((item) => {
      console.log("Current Item:", item);
      return item.hasOwnProperty("price") || item.status === true;
    });

    console.log("Filtered Array (d2):", d2);
    if (findPreData.length > 0) {
      const updateLabCharges = await LabChargesModel.findOneAndUpdate(
        { party, party_id },
        { testsPrice: d2 },
        { new: true }
      );
      if (!updateLabCharges) throw new Error("Lab charges not found.");
      res.status(200).send({ updatedData: updateLabCharges });
      return;
    }
    // create
    const createLabCharges = await LabChargesModel.create({
      party,
      party_id,
      testsPrice: d2,
    });
    res.status(200).send({ createdData: createLabCharges });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
  // LabChargesModel.deleteMany({}, (err) => {
  //   if (err) {
  //     console.error("Error deleting documents:", err);
  //     // Handle error
  //   } else {
  //     console.log("All documents deleted successfully");
  //     // Handle success
  //   }
  // });
});

router.get("/vectorlabcharges", async (req, res) => {
  try {
    const { name, party, _id } = req.query;
    console.log(name, party, _id);
    if (!name || !party) throw new Error("Party And Name is required.");
    let response = await LabChargesModel.find({
      testsPrice: {
        $elemMatch: {
          testName: { $regex: new RegExp(`${name}`, "i") },
          status: true,
        },
      },
      party: { $regex: new RegExp(`${party}`, "i") },
      party_id: _id,
    });
    if (response.length <= 0) throw new Error("No Data Found");
    let testdetails = response[0].testsPrice.filter(
      (item) => item.status !== false
    );
    const testdetails1 = testdetails.map((item, ...rest) => {
      return {
        name: item.testName,
        code: item.testCode,
        price: item.price,
        status: item.status,
        _id: item._id,
      };
    });

    console.log(testdetails1);
    res.status(200).send({ data: testdetails1 });
    console.log(response);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

export default router;
