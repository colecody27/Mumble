const express = require("express");
const router = express.Router();
const { addAdminRole } = require("../models/addingAdmin");

router.get("/", async (req, res) => {
  router.post("/addAdmin", async (req, res) => {
    try {
      const userId = req.body.userId; // Or however you choose to identify the user
      const adminType = "databaseAdmin"; // or 'channelAdmin'
      const channelIds = []; // Relevant for 'channelAdmin'

      const result = await addAdminRole(userId, adminType, channelIds);
      res.status(200).json({ message: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post("/updateRole", async (req, res) => {
    try {
      const { userId, newRole } = req.body;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { role: newRole },
        { new: true }
      );
      res.status(200).json({ message: "User role updated", user: updatedUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});

module.exports = router;
