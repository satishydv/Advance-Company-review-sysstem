const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Company = require("../model/companyModel");

// Optional: if you're using a separate DB config file
// const connectDB = require("../config/db");
// await connectDB();

dotenv.config({ path: "../config.env" });

// Connect to DB
const DB = process.env.DB.replace("<PASSWORD>", process.env.DB_PASSWORD);

mongoose
  .connect(DB)
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.log(err));

// Your bank/company list

const banks = [
  "State Bank of India",
  "Punjab National Bank",
  "Bank of Baroda",
  "Canara Bank",
  "Union Bank of India",
  "Bank of India",
  "Indian Bank",
  "Central Bank of India",
  "Indian Overseas Bank",
  "UCO Bank",
  "Bank of Maharashtra",
  "Punjab & Sind Bank",
  "IDBI Bank",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Kotak Mahindra Bank",
  "IndusInd Bank",
  "Yes Bank",
  "IDFC FIRST Bank",
  "Federal Bank",
  "South Indian Bank",
  "RBL Bank",
  "Bandhan Bank",
  "CSB Bank",
  "DCB Bank",
  "Karnataka Bank",
  "Karur Vysya Bank",
  "City Union Bank",
  "Tamilnad Mercantile Bank",
  "Jammu & Kashmir Bank",
  "AU Small Finance Bank",
  "Equitas Small Finance Bank",
  "Ujjivan Small Finance Bank",
  "Suryoday Small Finance Bank",
  "Jana Small Finance Bank",
  "ESAF Small Finance Bank",
  "Fincare Small Finance Bank",
  "North East Small Finance Bank",
  "Utkarsh Small Finance Bank",
  "Shivalik Small Finance Bank",
  "Nainital Bank",
  "Saraswat Bank",
  "Punjab & Maharashtra Co-operative Bank",
  "Apna Sahakari Bank",
  "Paytm Payments Bank",
  "Airtel Payments Bank",
  "India Post Payments Bank",
  "Fino Payments Bank",
  "NSDL Payments Bank",
  "HDB Financial Services",
  "Bajaj Finance",
  "Muthoot Finance",
  "Manappuram Finance",
  "Mahindra Finance"
];

// Insert Companies
const addCompanies = async () => {
  try {
    await Company.deleteMany(); // optional: to prevent duplicates
    const formatted = banks.map((name) => ({
      name: name.trim(),
      totalReviews: 0,
      positiveCount: 0,
      negativeCount: 0,
      nutralCount: 0,
      reviews: [],
    }));
    await Company.insertMany(formatted);
    console.log("✅ Companies added successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error adding companies:", err);
    process.exit(1);
  }
};

// Delete all companies if exist initially
const deleteCompanies = async () => {
  try {
    await Company.deleteMany();
    console.log("🗑️ All companies deleted successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error deleting companies:", err);
    process.exit(1);
  }
};

// CLI logic
const run = async () => {
  const arg = process.argv[2];
  if (arg === "--add") {
    await addCompanies();
  } else if (arg === "--delete") {
    await deleteCompanies();
  } else {
    console.log("❓ Use '--add' to seed or '--delete' to wipe companies.");
    process.exit(0);
  }
};

run();
