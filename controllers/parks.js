const Park = require("../models/Park");

// @desc Get all parks
// @route GET /parks
// @access Public
exports.getParks = async (req, res, next) => {
  try {
    const parks = await Park.find();
    return res.status(200).json({
      success: true,
      count: parks.length,
      data: parks,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc Add a park
// @route POST /parks
// @access Public
exports.addPark = async (req, res, next) => {
  try {
    const park = await Park.create(req.body);
    const savedPark = await park.save();
    return res.status(200).json({
      success: true,
      data: savedPark,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc Fetch all parks within distance (meters) of longitude, latitude
// @route POST /parks/nearby
// @access Public
exports.fetchParksNearby = async (req, res, next) => {
  try {
    const parks = await Park.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [req.body.longitude, req.body.latitude],
          },
          $maxDistance: req.body.distance,
        },
      },
    });
    return res.status(200).json({
      success: true,
      count: parks.length,
      data: parks,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
