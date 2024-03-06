const { Router } = require("express");
const {
  getAllShortUrl,
  getShortUrl,
  createShortUrl,
} = require("../controllers/shortener.controller");
const router = Router();

// getAllShortUrl
router.get("/", getAllShortUrl);

// getShortUrl
router.get("/:idShort", getShortUrl);

// createShortUrl
router.post("/createUrlShort", createShortUrl);

module.exports = router;
