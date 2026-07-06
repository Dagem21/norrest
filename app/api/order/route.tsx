import { orderStatusTypes } from "@/assets/enums/enum";
import { deleteOrder, findOrderByID, updateOrder } from "@/dal/order/orderDAL";
import { verifyUserAuth } from "@/utils/authHelper";
import { NextRequest } from "next/server";
import mongoose from "mongoose";
import { findBranchByID } from "@/dal/company/branchDAL";
import { updateOrderCount } from "@/dal/order/orderCountDAL";
import { createOrder } from "@/dal/order/orderDAL";
import orderSchema from "@/yup/order/order";
import { notifyOrderCreated } from "@/sio/order";

export async function GET(request: NextRequest) {
    const searchParams = request?.nextUrl?.searchParams;
    const orderID = searchParams.get("orderID");

    try {
        if (!orderID) {
            return new Response(
                JSON.stringify({
                    error: "Missing order ID.",
                }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        const { order, error } = await findOrderByID(orderID);

        if (!order || error) {
            return new Response(JSON.stringify({ error: error || "Order not found." }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ order }), {
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
        return new Response(JSON.stringify({ error }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { order } = body;

    try {
        const validOrder = await orderSchema.validate(order, { abortEarly: false });
        try {
            const decodedToken = await verifyUserAuth();

            validOrder.userID = decodedToken.userId;
            validOrder.items = validOrder?.items?.map((item) => {
                return { ...item, userID: decodedToken.userId };
            });
        } catch (error: any) {
            if (
                error.message === "Unauthorized" &&
                validOrder?.status !== orderStatusTypes.Pending
            ) {
                return new Response(JSON.stringify({ error: "Please login to save your order!" }), {
                    status: 403,
                    headers: { "Content-Type": "application/json" },
                });
            }
        }

        const { branch, error: branchError } = await findBranchByID(validOrder.branchID);
        if (!branch || branchError) {
            return new Response(
                JSON.stringify({
                    error: branchError || "Branch not found.",
                }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        const { result, error } = await createOrder(validOrder);

        if (!result || error) {
            return new Response(JSON.stringify({ error }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const updateOC = { $inc: { "counts.$.count": 1 } };

        await updateOrderCount(
            {
                branchID: new mongoose.Types.ObjectId(validOrder.branchID),
                "counts.status": validOrder?.status,
            },
            updateOC,
        );

        if (validOrder.status === orderStatusTypes.Pending) {
            const { order: newOrder, error } = await findOrderByID(result?._id?.toString());
            const { notified } = await notifyOrderCreated(validOrder.branchID, newOrder);
        }

        return new Response(JSON.stringify({ order: result, message: "Order created." }), {
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
        return new Response(JSON.stringify({ error }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
}

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
        return new Response(JSON.stringify({ error }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
}

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
        return new Response(JSON.stringify({ error }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
}
