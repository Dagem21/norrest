import { orderStatusTypes } from "@/assets/enums/enum";
import { deleteOrder, findOrderByID } from "@/dal/order/orderDAL";
import { verifyUserAuth } from "@/utils/authHelper";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
    const body = await request.json();
    const { orderID } = body;

    try {
        const decodedToken = await verifyUserAuth();

        if (!orderID) {
            return new Response(JSON.stringify({ error: "Order ID missing." }), {
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

        if (order.userID?.toString() !== decodedToken.userId) {
            return new Response(JSON.stringify({ error: "You can not clear this order." }), {
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

        const { result, error: errorUpdate } = await deleteOrder(orderID);

        if (!result || errorUpdate) {
            return new Response(JSON.stringify({ error: errorUpdate || "Order not found." }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ message: "Order deleted." }), {
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
