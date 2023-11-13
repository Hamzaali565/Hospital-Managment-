import express from "express";
const router = express.Router();

router.post("/radiocharges", async (req, res) => {
  try {
    const { party, IPD, ER, parentService, serviceDetail } = req.body;
    if (![party, IPD, ER, parentService, serviceDetail].every(Boolean))
      throw new Error("All Parameters Are Required");
  } catch (error) {}
});
