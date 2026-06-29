import { Schema, model, models, Types } from "mongoose";
import { orderStatusTypes } from "@/assets/enums/enum";

const orderCountSchema = new Schema(
    {
        branchID: {
            type: Types.ObjectId,
            ref: "branches",
            unique: true,
        },
        userID: {
            type: Types.ObjectId,
            ref: "users",
            required: true,
            unique: true,
        },
        counts: [
            {
                status: {
                    type: String,
                    enum: Object.values(orderStatusTypes),
                },
                count: {
                    type: Number,
                    default: 0,
                },
            },
        ],
    },
    { timestamps: true },
);

const Orderscount = models.orderscount || model("orderscount", orderCountSchema);
export default Orderscount;
