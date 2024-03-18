const express = require('express');
const { registerUser, authUser, allUsers } = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Define a route that responds to GET requests with a callback function
router.route("/")
    .get(protect, allUsers)
    .post(registerUser);

router.post('/login', authUser);

module.exports = router;

