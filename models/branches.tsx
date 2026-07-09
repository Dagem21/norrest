import { branchStatusTypes } from "@/assets/enums/enum";
import { Schema, model, models, Types } from "mongoose";

const branchSchema = new Schema(
    {
        companyID: {
            type: Types.ObjectId,
            ref: "companies",
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
        address: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: branchStatusTypes,
            required: true,
            default: branchStatusTypes.Active,
        },
        rating: {
            type: Number,
            default: 0,
        },
        totalRatings: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true },
);

const Branch = models.branches || model("branches", branchSchema);
export default Branch;
