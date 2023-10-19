import express from "express";
import { BED } from "./Checking.mjs";
import { consultantVisitModel } from "../../../../dbRepo/ER/TransactionModel/BedAllocation/ConsultantVisitModel.mjs";

const router = express.Router();

router.post("/consultantVisit", async (req, res) => {
  let consultantVisit = req.body.consultantVisit;
  BED(req, res, consultantVisit, consultantVisitModel);
});
export default router;
