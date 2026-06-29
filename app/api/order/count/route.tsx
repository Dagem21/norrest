import { permissionTypes } from "@/assets/enums/enum";
import { findBranchByID } from "@/dal/company/branchDAL";
import { findCompanyByID } from "@/dal/company/companyDAL";
import { findOrderCount } from "@/dal/order/orderCountDAL";
import { findPermission, findUserCompanies } from "@/dal/permissions/permissionsDAL";
import { verifyUserAuth } from "@/utils/authHelper";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request?.nextUrl?.searchParams;
    const branchID = searchParams.get("branchID");

    try {
        const decodedToken = await verifyUserAuth();

        if (!branchID) {
            return new Response(
                JSON.stringify({
                    error: "Missing branch ID.",
                }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        const { branch, error: branchError } = await findBranchByID(branchID);
        if (!branch || branchError) {
            return new Response(
                JSON.stringify({
                    error: branchError || "Branch not found.",
                }),
                {
                    status: 404,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        const { permission, error: errorPerm } = await findPermission({
            companyID: branch?.companyID,
            userID: decodedToken?.userId,
        });

        if (!permission || errorPerm) {
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

        if (permission?.branchID && permission?.branchID !== branchID) {
            return new Response(
                JSON.stringify({ error: "You do not have permission to perform this action." }),
                {
                    status: 403,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        const { orderCount, error } = await findOrderCount({ branchID });

        return new Response(JSON.stringify({ orderCount }), {
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
