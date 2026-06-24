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
    },
    { timestamps: true },
);

const Branch = models.branches || model("branches", branchSchema);
export default Branch;
