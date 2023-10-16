import mongoose from "mongoose";

const UserWiseWard = new mongoose.Schema({
  wardName: { type: String, required: true },
  mappedUsers: [
    {
      userName: { type: String },
      status: { type: Boolean, default: true },
    },
  ],
});

export const UserWiseWardModel = mongoose.model("UserWiseWard", UserWiseWard);
