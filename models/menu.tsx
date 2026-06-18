const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
    {
        branchID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Branches",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
        },
        ingredients: {
            type: String,
            required: true,
        },
        category: {
            type: [String],
            required: true,
        },
        picture: {
            type: [String],
            required: true,
        },
        rating: {
            type: Number,
            default: 0,
        },
        totalRatings: {
            type: Number,
            default: 0,
        },
        discount: {
            type: Number,
        },
        discountStart: {
            type: Date,
        },
        discountEnd: {
            type: Date,
        },
        inputter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
    },
    { timestamps: true },
);

module.exports = mongoose?.models?.menus || mongoose.model("menus", menuSchema);
export {};
