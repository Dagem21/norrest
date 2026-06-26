import { orderStatusTypes } from "@/assets/enums/enum";
import { findOrderByID, updateOrder } from "@/dal/order/orderDAL";
import { verifyUserAuth } from "@/utils/authHelper";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
    const body = await request.json();
    const { orderID, orderItemID } = body;

    try {
        const decodedToken = await verifyUserAuth();

        if (!orderID || !orderItemID) {
            return new Response(JSON.stringify({ error: "Order ID or Item ID missing." }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const { order, error } = await findOrderByID(orderID);

        if (!order || error) {
            return new Response(JSON.stringify({ error: error || "Order not found." }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const orderItem = order?.items?.find((item: any) => item?._id === orderItemID);
        if (order.userID?.toString() !== decodedToken.userId && orderItem?.userID?.toString !== decodedToken.userId) {
            return new Response(JSON.stringify({ error: "You can not remove this item from order." }), {
                status: 403,
                headers: { "Content-Type": "application/json" },
            });
        }

        if (order.status !== orderStatusTypes.Draft) {
            return new Response(JSON.stringify({ error: "Order is already being processed." }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const updateItems = { $pull: { items: { _id: orderItemID } } }
        const { result, error: errorUpdate } = await updateOrder(orderID, updateItems);

        if (!result || errorUpdate) {
            return new Response(JSON.stringify({ error: errorUpdate || "Order not found." }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ message: "Item removed from order." }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        if (error.message === "Unauthorized") {
            return new Response(JSON.stringify({ error: "Please login!" }), {
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