import { Schema, model, models, Types } from "mongoose";

const menuSchema = new Schema(
    {
        branchID: {
            type: Types.ObjectId,
            ref: "branches",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
        },
        ingredients: {
            type: String,
            required: true,
        },
        category: {
            type: [String],
            required: true,
        },
        picture: {
            type: [String],
            required: true,
        },
        rating: {
            type: Number,
            default: 0,
        },
        totalRatings: {
            type: Number,
            default: 0,
        },
        discount: {
            type: Number,
        },
        discountStart: {
            type: Date,
        },
        discountEnd: {
            type: Date,
        },
        inputter: {
            type: Types.ObjectId,
            ref: "users",
            required: true,
        },
    },
    { timestamps: true },
);

const Menu = models.menus || model("menus", menuSchema);
export default Menu;
