import { orderStatusTypes } from "@/assets/enums/enum";
import { findBranchByID } from "@/dal/company/branchDAL";
import { updateOrderCount } from "@/dal/order/orderCountDAL";
import { findOrderByID, findOrders, updateOrder } from "@/dal/order/orderDAL";
import { findPermission } from "@/dal/permissions/permissionsDAL";
import { notifyOrderUpdated } from "@/sio/order";
import { verifyUserAuth } from "@/utils/authHelper";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

interface permssionQueryType {
    companyID: mongoose.Types.ObjectId;
    userID?: mongoose.Types.ObjectId;
    branchID?: mongoose.Types.ObjectId;
}

export async function GET(request: NextRequest) {
    const searchParams = request?.nextUrl?.searchParams;
    const branchID = searchParams.get("branchID");
    const status = searchParams.get("status");
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";

    try {
        const decodedToken = await verifyUserAuth();

        if (!branchID) {
            return new Response(JSON.stringify({ error: "Missing branch ID." }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const { branch, error: branchError } = await findBranchByID(branchID);
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

        const permissionQuery: permssionQueryType = {
            companyID: branch.companyID,
            userID: new mongoose.Types.ObjectId(decodedToken?.userId),
        };

        const { permission: userPermission, error: errorPerm } =
            await findPermission(permissionQuery);

        if (!userPermission || errorPerm) {
            return new Response(
                JSON.stringify({
                    error: errorPerm || "You do not have permission to perform this action.",
                }),
                {
                    status: 403,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        if (userPermission?.branchID && userPermission?.branchID?.toString() !== branchID) {
            return new Response(
                JSON.stringify({ error: "You do not have permission to perform this action." }),
                {
                    status: 403,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        const ordersQuery: any = {
            branchID: new mongoose.Types.ObjectId(branchID),
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

export async function PUT(request: NextRequest) {
    const body = await request.json();
    let { orderID, status } = body;

    try {
        const decodedToken = await verifyUserAuth();

        if (!orderID || !status) {
            return new Response(JSON.stringify({ error: "Missing order ID or status." }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        if (!Object.values(orderStatusTypes).includes(status)) {
            return new Response(JSON.stringify({ error: "Invalid order status." }), {
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

        const { branch, error: branchError } = await findBranchByID(
            order?.branchID?._id?.toString(),
        );
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

        const permissionQuery: permssionQueryType = {
            companyID: branch.companyID,
            userID: new mongoose.Types.ObjectId(decodedToken?.userId),
        };

        const { permission: userPermission, error: errorPerm } =
            await findPermission(permissionQuery);

        if (!userPermission || errorPerm) {
            return new Response(
                JSON.stringify({
                    error: errorPerm || "You do not have permission to perform this action.",
                }),
                {
                    status: 403,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        if (
            userPermission?.branchID &&
            userPermission?.branchID?.toString() !== order?.branchID?._id?.toString()
        ) {
            return new Response(
                JSON.stringify({ error: "You do not have permission to perform this action." }),
                {
                    status: 403,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        let {
            order: orderUpdated,
            result,
            error: errorUpdate,
        } = await updateOrder(
            { _id: new mongoose.Types.ObjectId(orderID) },
            { status },
            { returnDocument: "after" },
        );
        if (!result || errorUpdate) {
            return new Response(
                JSON.stringify({ error: errorUpdate || "Failed to update order status." }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        if (status === orderStatusTypes.Processing && order?.userID) {
            const { notified } = await notifyOrderUpdated(
                order?.userID?._id?.toString(),
                orderUpdated,
            );
        }

        const updateOC = {
            $inc: {
                "counts.$[pendingEl].count": -1,
                "counts.$[processingEl].count": 1,
            },
        };

        await updateOrderCount({ branchID: order?.branchID?._id }, updateOC, {
            arrayFilters: [
                { "pendingEl.status": "Pending" },
                { "processingEl.status": "Processing" },
            ],
        });

        return new Response(JSON.stringify({ message: "Order status updated." }), {
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
