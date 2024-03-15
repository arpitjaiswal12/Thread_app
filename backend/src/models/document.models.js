import mongoose, { Schema } from "mongoose";

const documentSchema = new Schema(
  {
    file: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Document = mongoose.model("Document", documentSchema);
