import { permissionTypes, roleTypes } from "@/assets/enums/enum";

const mongoose = require("mongoose");

const permissionsSchema = new mongoose.Schema(
    {
        companyID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "companies",
            required: true,
        },
        branchID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "branches",
        },
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        role: {
            type: String,
            enum: roleTypes,
            required: true,
        },
        permissions: [
            {
                type: String,
                enum: permissionTypes,
            },
        ],
        creatorID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
    },
    { timestamps: true },
);
permissionsSchema.index({ branchID: 1, userID: 1 }, { unique: true });

module.exports = mongoose?.models?.permissions || mongoose.model("permissions", permissionsSchema);
export {};
