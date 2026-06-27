import { orderStatusTypes } from "@/assets/enums/enum";
import { findOrderByID, updateOrder } from "@/dal/order/orderDAL";
import { verifyUserAuth } from "@/utils/authHelper";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
    const body = await request.json();
    const { orderID, status }: { orderID: string; status: orderStatusTypes } = body;

    try {
        const decodedToken = await verifyUserAuth();

        const { order, error: errorOrder } = await findOrderByID(orderID);
        if (!order || errorOrder) {
            return new Response(JSON.stringify({ error: errorOrder || "Order not found." }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        if (order?.userID?.toString() !== decodedToken.userId) {
            return new Response(JSON.stringify({ error: "You can not update this order." }), {
                status: 403,
                headers: { "Content-Type": "application/json" },
            });
        }

        const { result, error } = await updateOrder(
            { _id: new mongoose.Types.ObjectId(orderID) },
            { $set: { status: status } },
        );

        if (!result || error) {
            return new Response(JSON.stringify({ error: error || "Order not found." }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ message: "Order updated." }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        if (error.message === "Unauthorized") {
            return new Response(JSON.stringify({ error: "Session expired. Please login again!" }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }
        console.log(error);
        return new Response(JSON.stringify({ error }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
}
