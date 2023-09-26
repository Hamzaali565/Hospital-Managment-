import mongoose, { Schema } from "mongoose";

const partySchema = new mongoose.Schema({
  parent: {
    type: String,
    required: true,
  },
  parentCode: {
    type: Number,
    required: true,
  },
  childs: [
    {
      name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
      },
      area: {
        type: String,
      },
      contact: {
        type: Number,
      },
      coordinator: {
        type: String,
      },
      email: {
        type: String,
      },
      accountCode: {
        type: Number,
      },
      status: {
        type: Boolean,
      },
    },
  ],
});

export const PartyModel = mongoose.model("Parties", partySchema);
