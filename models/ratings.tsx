import { Schema, model, models, Types } from "mongoose";

const ratingSchema = new Schema(
    {
        userID: {
            type: Types.ObjectId,
            ref: "users",
            required: true,
        },
        branchID: {
            type: Types.ObjectId,
            ref: "branches",
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            default: 0,
        },
        comment: {
            type: String,
        },
    },
    { timestamps: true },
);

const Rating = models.ratings || model("ratings", ratingSchema);
export default Rating;
