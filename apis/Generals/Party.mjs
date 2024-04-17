import express from "express";
import { PartyModel } from "../../dbRepo/PartyModel.mjs";
const router = express.Router();

router.post("/addparty", async (req, res) => {
  try {
    let { parent, parentCode, childs } = req.body;
    if (![parent, parentCode].every(Boolean))
      throw new Error("Parent And its Code is required");
    console.log(childs);
    const checkParent = await PartyModel.find({ parent });
    if (!childs || childs?.length <= 0) {
      console.log("here in 72");
      if (checkParent?.length > 0) throw new Error("Parent Already Exist");
      const ParentAdd = await PartyModel.create({ parent, parentCode });
      res.status(200).send({ data: ParentAdd });
      console.log("here in 78");
      return;
    }
    if (childs.length > 0) {
      //   console.log(childs[0].accountCode);
      if (childs[0].accountCode === parentCode)
        throw new Error("Parent And Child Code Can't Be Same");
      let childInside = true;
      for (const items of childs) {
        if (![items?.name, items?.accountCode, items?.status].every(Boolean)) {
          childInside = false;
          break;
        }
      }
      if (childInside === false) {
        throw new Error("All Parameters of Child is Required");
      } else {
        if (checkParent?.length > 0) {
          const pushChild = await PartyModel.findOneAndUpdate(
            { parent },
            { $push: { childs } },
            { new: true }
          );
          console.log("pushed in 98");
          res.status(201).send({ data: pushChild });
          return;
        } else {
          const parentChild = await PartyModel.create({
            parent,
            parentCode,
            childs,
          });
          console.log("Here in 103");
          res.status(201).send({ data: parentChild });
          return;
        }
      }
    }
  } catch (error) {
    res.status(402).send({ data: error.message });
  }
});

router.get("/getparties", async (req, res) => {
  try {
    const response = await PartyModel.aggregate([
      {
        $unwind: "$childs",
      },
      {
        $project: {
          parent: 1,
          childId: "$childs._id",
          childName: "$childs.name",
        },
      },
    ]);
    if (res.length <= 0) throw new Error("No data found.");
    res.status(200).send({ data: response });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get("/vectorparty", async (req, res) => {
  try {
    const { name } = req.query;
    let response = await PartyModel.find({
      childs: {
        $elemMatch: {
          name: { $regex: new RegExp(`${name}`, "i") },
          status: true,
        },
      },
    });

    // Filter out documents where all children have status false
    response = response[0].childs.filter((doc) => doc.status === true);
    console.log(response[0]);
    if (response.length <= 0) throw new Error("No Party Found with this Name.");
    res.status(200).send({ data: response });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

export default router;
