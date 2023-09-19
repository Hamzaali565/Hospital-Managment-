import mongoose from "mongoose";
import express from "express";

const router = express.Router();

router.post("/adddoctor", async (req, res) => {
  try {
    const {
      code,
      name,
      speciality,
      pmdc,
      address,
      email,
      cnic,
      phone,
      status,
    } = req.body;
    if (![code, name, speciality, cnic].every(Boolean))
      throw new Error("fields like Code, Name, Speciality, Cnic are Mendotary");
  } catch (error) {
    res.status(400).send({ message: `${error.message}` });
  }
});

export default router;
