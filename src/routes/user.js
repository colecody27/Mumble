const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });
    res.redirect("/login");
  } catch (err) {
    if (err.code === 11000) {
      res.json({ status: "error", error: "Duplicate Email" });
    } else {
      // If the error is not a unique constraint violation, respond with a general error message
      res.json({
        status: "error",
        error: err.message,
      });
    }
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.json({ status: "error", error: "Invalid Login" });
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret123"
    );

    return res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .redirect("/api/channels");
  } else {
    return res.json({ status: "error", user: false });
  }
});

router.get("/login", async (req, res) => {
  res.clearCookie("access_token").redirect("/login");
});

module.exports = router;
