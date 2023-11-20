import mongoose from "mongoose";

const UserWiseService = new mongoose.Schema({
  serviceCode: { type: String, required: true },
  serviceName: { type: String, required: true },
  usersDetails: [
    {
      userName: { type: String },
    },
  ],
});

export const UserWiseServiceModel = mongoose.model(
  "UserWiseService",
  UserWiseService
);
