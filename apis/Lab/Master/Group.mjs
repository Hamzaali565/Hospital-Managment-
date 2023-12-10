import express from "express";
const router = express.Router();

router.post("/labgroup", async (req, res) => {
  try {
    const {
      groupCode,
      groupName,
      department,
      reportDays,
      groupDetails,
      testStyle,
      rangesDetails,
    } = req.body;
    if (
      ![groupName, department, reportDays, groupDetails, rangesDetails].every(
        Boolean
      )
    )
      throw new Error("All parameters are required.");
    //   continoue
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
