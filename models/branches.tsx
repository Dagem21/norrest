const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema(
    {
        companyID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Companies",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

module.exports = mongoose?.models?.branches || mongoose.model("branches", branchSchema);
export {};
