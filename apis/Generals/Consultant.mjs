import mongoose from "mongoose";
import express from "express";
import { ConsultantsModel } from "../../dbRepo/ConsultantModel.mjs";

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
    const create = await ConsultantsModel.create({
      code,
      name,
      speciality,
      pmdc,
      address,
      email,
      cnic,
      phone,
      status,
    });
    console.log("created", create);
    res.status(200).send({ message: "Data Inserted Successfully" });
  } catch (error) {
    res.status(400).send({ message: `${error.message}` });
  }
});

export default router;
