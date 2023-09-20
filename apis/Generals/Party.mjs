import express from "express";
import { PartyModel } from "../../dbRepo/PartyModel.mjs";
const router = express.Router();

router.post("/addparty", async (req, res) => {
  try {
    const {
      partyCode,
      partyDescription,
      parentCode,
      Address,
      coOrdinator,
      area,
      email,
      contactNo,
      accountCode,
      transactionType,
      status,
      defaultType,
      paymentReciept,
    } = req.body;
    if (![parentCode].every(Boolean)) {
      if (![accountCode, partyCode, partyDescription].every(Boolean))
        throw new Error(
          "Account Code, Description and Party Code  is required to create Parent Account"
        );
      const insertparent = await PartyModel.create({
        accountCode,
        partyDescription: partyDescription,
        parentCode: partyCode,
        partyCode: "-",
      });
      res.status(200).send({ data: insertparent });
      return;
    }
    if (parentCode) {
      res.status(200).send({ data: "insertparent" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: `${error.message}` });
  }
});

export default router;
