import { orderStatusTypes } from "@/assets/enums/enum";
import { deleteOrder, findOrderByID, findOrders } from "@/dal/order/orderDAL";
import { verifyUserAuth } from "@/utils/authHelper";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request?.nextUrl?.searchParams;
    const status = searchParams.get("status");
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";

    try {
        const decodedToken = await verifyUserAuth();

        const ordersQuery: any = {
            userID: new mongoose.Types.ObjectId(decodedToken.userId),
        };
        if (status) ordersQuery.status = status;

        let { orders, error } = await findOrders(ordersQuery, parseInt(page), parseInt(limit));
        if (!orders || error) {
            return new Response(JSON.stringify({ error }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            return new Response(JSON.stringify(orders), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }
    } catch (error: any) {
        if (error.message === "Unauthorized") {
            return new Response(JSON.stringify({ error: "Invalid or expired token." }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }
        return new Response(JSON.stringify({ error }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export async function DELETE(request: NextRequest) {
    const body = await request.json();
    const { id } = body;

    try {
        const decodedToken = await verifyUserAuth();

        if (!id) {
            return new Response(JSON.stringify({ error: "Missing order ID." }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        let { order, error } = await findOrderByID(id);
        if (!order || error) {
            return new Response(JSON.stringify({ error: error || "Order not found." }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        if (order?.status !== orderStatusTypes.Cart && order?.status !== orderStatusTypes.Pending) {
            return new Response(JSON.stringify({ error: "Order is already processed." }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const { result, error: errorDelete } = await deleteOrder(id);
        if (!result || errorDelete) {
            return new Response(JSON.stringify({ error: errorDelete || "Failed to delete order." }), {
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
            return new Response(JSON.stringify({ error: "Invalid or expired token." }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }
        return new Response(JSON.stringify({ error }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
}
