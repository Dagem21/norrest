import { permissionTypes, roleTypes } from "@/assets/enums/enum";
import { Schema, model, models, Types } from "mongoose";

const permissionsSchema = new Schema(
    {
        companyID: {
            type: Types.ObjectId,
            ref: "companies",
            required: true,
        },
        branchID: {
            type: Types.ObjectId,
            ref: "branches",
        },
        userID: {
            type: Types.ObjectId,
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
            type: Types.ObjectId,
            ref: "Users",
        },
    },
    { timestamps: true },
);
permissionsSchema.index({ branchID: 1, userID: 1 }, { unique: true });

const Permission = models.permissions || model("permissions", permissionsSchema);
export default Permission;
