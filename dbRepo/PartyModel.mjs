import mongoose, { Schema } from "mongoose";

// const partySchema = new Schema({
//   data: {
//     type: Schema.Types.Mixed, // Use Mixed type to store JSON-like data
//     required: true, // You can make it required if needed
//   },
// });

// export const PartyModel = mongoose.model("Party", partySchema);

// const partyModel = new mongoose.Schema({
//   partyCode: { type: String, required: true },
//   partyDescription: { type: String, required: true },
//   parentCode: { type: String },
//   childData: {
//     type: Object,
//     name: { type: String },
//     address: { type: String },
//     phoneNo: { type: String },
//   },
// });

// export const PartyModel = mongoose.model("partyModel", partyModel);
// Address: { type: String },
// coOrdinator: { type: String },
// area: { type: String },
// email: { type: String },
// contactNo: { type: String },
// accountCode: { type: String },
// transactionType: { type: Boolean, default: false },
// status: { type: Boolean, default: false },
// defaultType: { type: Boolean, default: false },
// paymentReciept: { type: Boolean, default: false },

// const partyModel = new mongoose.Schema({
//   data: { type: JSON },
// });
// export const PartyModel = mongoose.model("Party", partyModel);

const partySchema = new mongoose.Schema({
  parent: {
    type: String,
    required: true,
  },
  childs: [
    {
      name: {
        type: String,
        required: true,
      },
    },
  ],
});

export const PartyModel = mongoose.model("Parties", partySchema);
