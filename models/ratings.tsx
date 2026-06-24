import { Schema, model, models, Types } from "mongoose";

const ratingSchema = new Schema(
    {
        userID: {
            type: Types.ObjectId,
            ref: "users",
            required: true,
        },
        menuID: {
            type: Types.ObjectId,
            ref: "menus",
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
