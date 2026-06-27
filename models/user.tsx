import { userTypes } from "@/assets/enums/enum";
import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
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
        type: {
            type: String,
            enum: userTypes,
            required: true,
            default: userTypes.Customer,
        },
    },
    { timestamps: true },
);

const User = models.users || model("users", UserSchema);
export default User;
