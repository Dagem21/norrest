const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        menuID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "menus",
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            default: 0,
        },
        comment: {
            type: String,
        },
    },
    { timestamps: true },
);

module.exports = mongoose?.models?.ratings || mongoose.model("ratings", ratingSchema);
export { };
