const express = require("express");
const {
  createStory,
  getAllReviews,
} = require("../controllers/reviewController");

const router = express.Router();

router.get("/all", getAllReviews);
router.post("/create", createStory);

module.exports = router;
