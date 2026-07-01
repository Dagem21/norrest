import { findBranchByID } from "@/dal/company/branchDAL";
import { findOrders } from "@/dal/order/orderDAL";
import { findPermission } from "@/dal/permissions/permissionsDAL";
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

        let { orders, error } = await findOrders(ordersQuery);
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
