const catchAsync = require("../utils/catchAsync");
const crypto = require("crypto");
const Story = require("../model/reviewModel");
const Company = require("../model/companyModel");

function generateAnonymousId() {
  return "Anon-" + crypto.randomBytes(3).toString("hex"); // Example: Anon-a3f9c2
}

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const {
    companyName = "",
    vibe = "",
    search = "",
    sort = "newest",
    page = 1,
    limit = 6,
  } = req.query;

  const filter = {};

  if (companyName) {
    filter.companyName = { $regex: companyName, $options: "i" };
  }

  if (vibe) {
    filter.vibe = vibe;
  }

  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  const sortOption = sort === "oldest" ? "createdAt" : "-createdAt";
  const skip = (page - 1) * limit;

  const [reviews, total] = await Promise.all([
    Story.find(filter).sort(sortOption).skip(skip).limit(Number(limit)),
    Story.countDocuments(filter),
  ]);

  res.status(200).json({
    status: "success",
    results: reviews.length,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / limit),
    data: { reviews },
  });
});

exports.createStory = catchAsync(async (req, res, next) => {
  const { vibe, companyName, isAnonymous, name, userType, title, story } =
    req.body;
  if (!isAnonymous && !name) {
    return next(new AppError("Name is required when not anonymous", 400));
  }

  // 1. Find company by name
  const company = await Company.findOne({ name: companyName.trim() });

  // 2. If company is not found, throw error
  if (!company) {
    return next(
      new AppError("Please select a valid company from the list", 400)
    );
  }

  // 3. Create new story
  const newStory = await Story.create({
    vibe,
    companyName: company.name, // Ensure consistent capitalization
    isAnonymous,
    name: isAnonymous ? undefined : name,
    anonymousId: isAnonymous ? generateAnonymousId() : undefined,
    userType,
    title,
    story,
  });

  // 4. Prepare update object for company stats
  const update = {
    $push: { reviews: newStory._id },
    $inc: { totalReviews: 1 },
  };

  if (vibe === "positive") {
    update.$inc.positiveCount = 1;
  } else if (vibe === "negative") {
    update.$inc.negativeCount = 1;
  } else if (vibe === "neutral") {
    update.$inc.nutralCount = 1;
  }

  // 5. Update the company
  await Company.findByIdAndUpdate(company._id, update);

  res.status(201).json({
    status: "success",
    message: "Story submitted successfully",
    data: {
      story: newStory,
    },
  });
});
