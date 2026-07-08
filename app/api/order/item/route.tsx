import { orderStatusTypes } from "@/assets/enums/enum";
import { findMenuByID } from "@/dal/menu/menuDAL";
import { findOrderByID, updateOrder } from "@/dal/order/orderDAL";
import { notifyOrderAddCart } from "@/sio/order";
import { verifyUserAuth } from "@/utils/authHelper";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
    const body = await request.json();
    const { orderID, itemID, quantity } = body;

    try {
        const item: any = {
            userID: null,
            itemID,
            quantity,
        };
        try {
            const decodedToken = await verifyUserAuth();
            item.userID = decodedToken.userId;
        } catch (error) { }

        const { order, error: errorOrder } = await findOrderByID(orderID);
        if (!order || errorOrder) {
            return new Response(JSON.stringify({ error: errorOrder || "Order not found." }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        const { menu, error: errorMenu } = await findMenuByID(item?.itemID);
        if (!menu || errorMenu) {
            return new Response(JSON.stringify({ error: errorMenu || "Item not found." }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        const items = order?.items;
        const savedItem = items?.find((it: any) => it.itemID.toString() === itemID);

        let updateResult;
        if (savedItem) {
            const updateItems = { $inc: { "items.$.quantity": item?.quantity || 1 } };

            updateResult = await updateOrder(
                { _id: new mongoose.Types.ObjectId(orderID), "items._id": savedItem._id },
                updateItems,
                { returnDocument: "after" },
            );
        } else {
            const updateItems = { $push: { items: item } };
            updateResult = await updateOrder(
                { _id: new mongoose.Types.ObjectId(orderID) },
                updateItems,
                { returnDocument: "after" },
            );
        }

        let { result, order: updatedOrder, error } = updateResult;
        if (!result || error) {
            return new Response(JSON.stringify({ error: error || "Order not found." }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        let savedItemID;
        if (savedItem) {
            savedItemID = savedItem?._id;
        } else {
            const newSavedItem = updatedOrder?.items?.find(
                (it: any) => it.itemID.toString() === itemID,
            );
            savedItemID = newSavedItem?._id;
        }

        if (order?.userID?._id?.toString() !== item.userID) {
            const { notified } = await notifyOrderAddCart(
                order?.userID?._id?.toString(),
                { order: { item: menu, quantity }, branchID: order?.branchID?._id?.toString() },
            );
        }

        return new Response(
            JSON.stringify({
                message: "Order updated.",
                item: { itemID: item.itemID.toString(), _id: savedItemID },
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            },
        );
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
    const { orderID, orderItemID, quantity = 1 } = body;

    try {
        let decodedToken = null;

        try {
            decodedToken = await verifyUserAuth();
        } catch (error) { }

        if (!orderID || !orderItemID) {
            return new Response(JSON.stringify({ error: "Order ID or Item ID missing." }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        if (quantity < 1) {
            return new Response(JSON.stringify({ error: "Invalid quantity." }), {
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

        const orderItem = order?.items?.find((item: any) => item?._id.toString() === orderItemID);

        if (orderItem?.userID && orderItem?.userID?.toString() !== decodedToken?.userId) {
            return new Response(
                JSON.stringify({ error: "You can not remove this item from order." }),
                {
                    status: 403,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        if (order.status !== orderStatusTypes.Cart) {
            return new Response(JSON.stringify({ error: "Order is already being processed." }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        let updateResult;
        if (orderItem?.quantity <= quantity) {
            const updateItems = { $pull: { items: { _id: orderItemID } } };
            updateResult = await updateOrder(
                { _id: new mongoose.Types.ObjectId(orderID) },
                updateItems,
            );
        } else {
            const updateItems = { $inc: { "items.$.quantity": -quantity } };
            updateResult = await updateOrder(
                { _id: new mongoose.Types.ObjectId(orderID), "items._id": orderItem._id },
                updateItems,
            );
        }

        const { result, error: errorUpdate } = updateResult;

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
