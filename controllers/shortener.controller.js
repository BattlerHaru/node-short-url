const { response, request } = require("express");
const ShortUrlModel = require("../models/shortUrl.model");
const { getShortId } = require("../helpers/toShortId");

const getAllShortUrl = async (req = request, res = response) => {
  try {
    const shortUrls = await ShortUrlModel.find();

    if (shortUrls) {
      return res.render("index", { shortUrls: shortUrls });
    }

    return res.render("index");
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "An error occurred while obtaining url list",
      error: error,
    });
  }
};

const getShortUrl = async (req = request, res = response) => {
  const { idShort } = req.params;

  try {
    const urlDB = await ShortUrlModel.findOne({ short: idShort });
    if (urlDB) {
      urlDB.clickHistory += 1;
      await urlDB.save();
      return res.redirect(urlDB.full);
    } else {
      return res.status(500).json({
        msg: "An error occurred while obtaining url short",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "An error occurred while obtaining url short",
      error: error,
    });
  }
};

const createShortUrl = async (req = request, res = response) => {
  const newFullUrl = req.body.fullUrl;

  try {
    let urlGenerate = await getShortId();

    const data = {
      full: newFullUrl,
      short: urlGenerate,
      clickHistory: 0,
    };

    const newUrl = new ShortUrlModel(data);

    await newUrl.save();

    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "An error occurred while creating the shortener",
      error: error,
    });
  }
};

module.exports = {
  getAllShortUrl,
  getShortUrl,
  createShortUrl,
};
