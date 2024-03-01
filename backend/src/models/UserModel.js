const mongoose = require("mongoose");

const user = mongoose.Schema(
  {
    email: {
      type: String,
    },

    password: {
      type: String,
      required: true,
    },
    countOfAdd: {
      type: Number,
    },
    countOfUpdate: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", user);
