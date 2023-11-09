import express from "express";
import { DiscountModel } from "../../dbRepo/DiscountModel.mjs";
const router = express.Router();
router.post("/discount", async (req, res) => {
  try {
    const { code, discountName, discountPercent, account, status } = req.body;
    if (![code, discountName, discountPercent, account].every(Boolean))
      throw new Error("AlL Parameters Are Required.");
    const CheckDuplicate = await DiscountModel.find(
      { $or: [{ discountName }, { code }] },
      "code -_id"
    );
    console.log(CheckDuplicate);
    if (CheckDuplicate.length > 0)
      throw new Error("This Code Or Discount Name is Already Taken");
    const CreateDiscount = await DiscountModel.create({
      code,
      discountName,
      discountPercent,
      account,
      status,
    });
    res.status(200).send({ data: CreateDiscount });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get("/getdiscount", async (req, res) => {
  try {
    const getDiscount = await DiscountModel.find();
    res.status(200).send({ data: getDiscount });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
export default router;
