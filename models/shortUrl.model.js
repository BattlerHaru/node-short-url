const { Schema, model } = require("mongoose");

const shortUrlSchema = Schema(
  {
    full: {
      type: String,
      required: [true, "The full URL is required"],
    },

    short: {
      type: String,
      required: [true, "The short URL is required"],
      unique: true,
    },

    clickHistory: {
      type: Number,
      required: true,
      default: 0,
    },
    expireAt: {
      type: Date,
      default: Date,
      expires: 15,
    },
  },
  { expires: 15 },
);

shortUrlSchema.methods.toJSON = function () {
  // const { __v, status, ...data } = this.toObject();
  const { ...data } = this.toObject();

  return data;
};

module.exports = model("shortUrl", shortUrlSchema);
