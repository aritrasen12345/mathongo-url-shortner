import mongoose from "mongoose";

const { Schema, model } = mongoose;

const shorturlSchema = new Schema(
  {
    url: {
      type: Schema.Types.String,
      required: true,
      trim: true,
    },
    originalUrl: {
      type: Schema.Types.String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default model("Shorturl", shorturlSchema);
