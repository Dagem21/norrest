import { orderStatusTypes } from "@/assets/enums/enum";
import { createOrder, updateOrder } from "@/dal/order/orderDAL";
import { verifyUserAuth } from "@/utils/authHelper";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { orderID, itemID, quantity } = body;

    try {
        const item: any = {
            userID: null,
            itemID,
            quantity
        }
        try {
            const decodedToken = await verifyUserAuth();
            item.userID = decodedToken.userId;
        } catch (error) { }

        const updateItems = { $push: { items: item } }
        const { result, error } = await updateOrder(orderID, updateItems);

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