const protect = require("../middleware/authMiddleware");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();
router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Auth routes are working!"
    });
});
// ============================
// Register User
// ============================
router.post("/register", async (req, res) => {

    try {

        const { username, email, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        // Create User
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        // Create JWT
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(201).json({
            success: true,
            token,
            user
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});
// ============================
// Login User
// ============================
router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        // Check user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        // Create JWT
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            success: true,
            token,
            user
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});
router.get("/profile", protect, async (req, res) => {

    const user = await User.findById(req.user.id).select("-password");

    res.json({
        success: true,
        user
    });

});
// ============================
// Leaderboard
// ============================
router.get("/leaderboard/:game", async (req, res) => {

    try {

        const game = req.params.game;

        const users = await User.find()
            .select("username scores")
            .sort({ [`scores.${game}`]: -1 })
            .limit(10);

        res.json({
            success: true,
            leaderboard: users
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});
// Add Favorite Game
router.post("/favorite", async (req, res) => {

    try {

        const { email, game } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (!user.favoriteGames.includes(game)) {
            user.favoriteGames.push(game);
            await user.save();
        }

        res.json({
            success: true,
            message: "Favorite game added successfully",
            favoriteGames: user.favoriteGames
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

module.exports = router;