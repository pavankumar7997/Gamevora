const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    username: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    avatar: {
        type: String,
        default: ""
    },

    highScore: {
        type: Number,
        default: 0
    },

    scores: {
        snake: {
            type: Number,
            default: 0
        },

        sudoku: {
            type: Number,
            default: 0
        },

        chess: {
            type: Number,
            default: 0
        },

        tictactoe: {
            type: Number,
            default: 0
        }
    },

    favoriteGames: {
        type: [String],
        default: []
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);