import { companyStatusTypes } from "@/assets/enums/enum";
import { Schema, model, models, Types } from "mongoose";

const companySchema = new Schema(
    {
        userID: {
            type: Types.ObjectId,
            ref: "users",
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
            type: [String],
            required: true,
        },
        status: {
            type: String,
            enum: companyStatusTypes,
            required: true,
            default: companyStatusTypes.Active,
        },
        description: {
            type: String,
        },
    },
    { timestamps: true },
);

const Company = models.companies || model("companies", companySchema);
export default Company;
