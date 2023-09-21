import express from "express";
import { PartyModel } from "../../dbRepo/PartyModel.mjs";
const router = express.Router();

router.post("/addparty", async (req, res) => {
  try {
    let { parent, childs } = req.body;
    if (!parent) throw new Error("Parent is required");
    // parent Check
    const checkParent = await PartyModel.find({ parent });
    console.log(checkParent);
    // goes inside if there is not child in body
    if (!childs || childs.length <= 0) {
      if (checkParent.length > 0) throw new Error("Parent Already Exist");
      const response = await PartyModel.create({ parent });
      res.status(200).send({ data: response });
      console.log("no child");
      return;
    }
    // goes inside if there is child in body
    else if (childs.length > 0) {
      let conditionCheck = true;
      for (const items of childs) {
        if (!items?.name) {
          conditionCheck = false;
          break;
        }
      }
      if (conditionCheck) {
        const response = await PartyModel.findOneAndUpdate(
          { parent },
          { $push: { childs } },
          { new: true }
        );
        if (response !== null) {
          res.status(200).send({ data: response });
          return;
        }
        console.log("is child", response);
        if (response === null) {
          const createBoth = await PartyModel.create({ parent, childs });
          res.status(200).send({ data: createBoth });
          return;
        }
      } else {
        const response = await PartyModel.create({ parent });
        res.status(200).send({ data: response });
        return;
      }
      return;
    }
  } catch (error) {
    res.status(402).send({ data: error.message });
  }
});
export default router;
