const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        website: {
            type: String,
        },
        picture: {
            type: String,
        },
    },
    { timestamps: true },
);

module.exports = mongoose?.models?.companies || mongoose.model("companies", companySchema);
export { };
