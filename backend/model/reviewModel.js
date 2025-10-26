const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    vibe: {
      type: String,
      enum: ["positive", "negative", "neutral"],
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: function () {
        return !this.isAnonymous;
      },
    },
    anonymousId: {
      type: String,
      required: function () {
        return this.isAnonymous;
      },
    },
    userType: {
      type: String,
      enum: [
        "individual customer",
        "business customer",
        "bank employee",
        "former employee",
        "investor",
        "other",
      ],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    story: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Story", storySchema);
