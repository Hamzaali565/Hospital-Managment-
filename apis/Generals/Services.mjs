import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.post("/addservice", async (req, res) => {
  try {
    let body = req.body;
    const { parentCode, childCode, parentName, childName } = body;
    if (![parentCode, parentName].every(Boolean))
      throw new Error("Parent Code and Parent Name Are Required");
  } catch (error) {
    res.status(200).send({ message: `${error.message}` });
  }
});

export default router;
