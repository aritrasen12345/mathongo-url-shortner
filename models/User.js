import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      trim: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: Schema.Types.String,
      require: true,
    },
    urls: [
      {
        type: Schema.Types.ObjectId,
        ref: "Shorturl",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("User", userSchema);
