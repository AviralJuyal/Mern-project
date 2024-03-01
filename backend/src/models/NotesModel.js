const mongoose = require("mongoose");
const UserModel = require("./UserModel");

const notes = mongoose.Schema(
  {
    text: {
      type: String,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: UserModel,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("notes", notes);
