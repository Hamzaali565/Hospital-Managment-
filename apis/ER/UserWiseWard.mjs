import express, { response } from "express";
import { UserWiseWardModel } from "../../dbRepo/ER/UserWiseWardModel.mjs";

const router = express.Router();

router.post("/userwiseward", async (req, res) => {
  try {
    const { wardName, mappedUsers } = req.body;
    if (!wardName) throw new Error("WardName is required field.");
    let checkChild = false;
    const childData = await mappedUsers.map((items) => {
      if (![items.userName].every(Boolean)) checkChild = true;
    });
    if (checkChild === true)
      throw new Error("UserName Inside Mapped User Is required");
    const checkDuplicate = await UserWiseWardModel.find(
      { wardName },
      "-_id wardName"
    );
    console.log(checkDuplicate);
    if (checkDuplicate.length > 0) throw new Error("GOTO EDIT FORM");
    const CreateMappedWard = await UserWiseWardModel.create({
      wardName,
      mappedUsers,
    });
    res.status(200).send({ data: CreateMappedWard });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
export default router;
