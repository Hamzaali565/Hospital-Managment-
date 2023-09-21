import express from "express";
import { PartyModel } from "../../dbRepo/PartyModel.mjs";
const router = express.Router();

router.post("/addparty", async (req, res) => {
  try {
    let { parent, childs } = req.body;
    if (!parent) throw new Error("Parent is required");

    if (!childs || childs.length <= 0) {
      const response = await PartyModel.create({ parent });
      res.status(200).send({ data: response });
      return;
    } else if (childs.length > 0) {
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
        res.status(200).send({ data: response });
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
