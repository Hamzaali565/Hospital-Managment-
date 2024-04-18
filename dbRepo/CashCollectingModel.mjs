import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose);

const { Schema } = mongoose;

const cashCollectingSchema = new Schema({
  code: { type: Number, unique: true }, // Change type to Number
  name: { type: String, required: true },
  status: { type: Boolean, default: false },
});

cashCollectingSchema.plugin(AutoIncrement, { inc_field: "code" });

export const cashCollectingModel = mongoose.model(
  "cashCollecting",
  cashCollectingSchema
);
