const express = require("express");
const {
  getAllCompanies,
  getAllCompaniesTotalStates,
  getALlCompaniesStats,
  getCompanyById,
} = require("../controllers/companyController");

const router = express.Router();

router.get("/all", getAllCompanies);
router.get("/total-stats", getAllCompaniesTotalStates);
router.get("/stats", getALlCompaniesStats);
router.get("/:id", getCompanyById);

module.exports = router;
