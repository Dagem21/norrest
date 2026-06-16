const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        fatherName: {
            type: String,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        picture: {
            type: String,
        },
        lastLogin: {
            type: Date,
        },
    },
    { timestamps: true },
);

module.exports = mongoose?.models?.users || mongoose.model("users", UserSchema);
export {};
