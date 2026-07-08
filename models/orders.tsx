import { Schema, model, models, Types } from "mongoose";
import { orderStatusTypes } from "@/assets/enums/enum";

const orderItemSchema = new Schema({
    userID: {
        type: Types.ObjectId,
        ref: "users",
    },
    itemID: {
        type: Types.ObjectId,
        ref: "menus",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
});

const orderSchema = new Schema(
    {
        userID: {
            type: Types.ObjectId,
            ref: "users",
        },
        branchID: {
            type: Types.ObjectId,
            ref: "branches",
            required: true,
        },
        items: [orderItemSchema],
        table: {
            type: Number,
        },
        status: {
            type: String,
            enum: Object.values(orderStatusTypes),
            default: orderStatusTypes.Cart,
            required: true,
        },
        waiterID: {
            type: Types.ObjectId,
            ref: "users",
        },
    },
    { timestamps: true },
);

const Order = models.orders || model("orders", orderSchema);
export default Order;
