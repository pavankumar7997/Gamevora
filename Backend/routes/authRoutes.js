const protect = require("../middleware/authMiddleware");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const sendEmail = require("../utils/sendEmail");
const Otp = require("../models/Otp");
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

        const { username, email, phone, password } = req.body;

        // Check OTP verification
        const verifiedOtp = await Otp.findOne({
            email,
            verified: true
        });

        if (!verifiedOtp) {
            return res.status(400).json({
                success: false,
                message: "Please verify your email OTP first."
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        // Check if phone already exists
        const existingPhone = await User.findOne({ phone });

        if (existingPhone) {
            return res.status(400).json({
                success: false,
                message: "Phone number already exists"
             });
        }
        const existingUsername = await User.findOne({ username });

        if (existingUsername) {
            return res.status(400).json({
                success: false,
                message: "Username already exists"
            });
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        // Create User
        const user = await User.create({
            username,
            email,
            phone,
            password: hashedPassword
        });
        // Delete OTP after successful registration
        await Otp.deleteOne({ email });
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

        const userData = await User.findById(user._id).select("-password");

            res.json({
            success: true,
            token,
            user: userData
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
router.post("/send-otp", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Delete old OTP if it exists
        await Otp.deleteMany({ email });

        // Save the new OTP
        await Otp.create({
            email,
            otp,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes
        });

        // Send the email
        await sendEmail(
            email,
            "GameVora Email Verification",
            `Your OTP is: ${otp}\n\nThis OTP is valid for 5 minutes.`
        );

        res.json({
            success: true,
            message: "OTP sent successfully"
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});
router.post("/verify-otp", async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required"
            });
        }

        const otpData = await Otp.findOne({ email });

        if (!otpData) {
            return res.status(400).json({
                success: false,
                message: "OTP not found or expired"
            });
        }

        if (otpData.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        otpData.verified = true;
        await otpData.save();

        res.json({
            success: true,
            message: "OTP verified successfully"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});
module.exports = router;