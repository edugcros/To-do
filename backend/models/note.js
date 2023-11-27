const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    norder: {
      type: Number,
      required: true,
    },
    noteby: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    done: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", noteSchema);
