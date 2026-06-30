import { permissionTypes, roleTypes } from "@/assets/enums/enum";
import { findBranchByID } from "@/dal/company/branchDAL";
import { findOrders } from "@/dal/order/orderDAL";
import {
    createPermission,
    findPermission,
    findPermissions,
    findUserCompanies,
} from "@/dal/permissions/permissionsDAL";
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
    const status = searchParams.get("status");

    try {
        const decodedToken = await verifyUserAuth();

        const ordersQuery: any = {
            userID: new mongoose.Types.ObjectId(decodedToken.userId),
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
