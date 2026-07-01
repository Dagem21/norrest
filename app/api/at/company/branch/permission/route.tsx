import { employeeStatusTypes } from "@/assets/enums/enum";
import { findBranchByID } from "@/dal/company/branchDAL";
import { findPermission } from "@/dal/permissions/permissionsDAL";
import { verifyUserAuth } from "@/utils/authHelper";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

interface permssionQueryType {
    userID: mongoose.Types.ObjectId;
    companyID?: mongoose.Types.ObjectId;
    branchID?: mongoose.Types.ObjectId;
}

export async function GET(request: NextRequest) {
    const searchParams = request?.nextUrl?.searchParams;
    let companyID = searchParams.get("companyID");
    const branchID = searchParams.get("branchID");
    try {
        const decodedToken = await verifyUserAuth();

        if (!companyID && !branchID) {
            return new Response(JSON.stringify({ error: "Missing company ID and branch ID." }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const permissionQuery: permssionQueryType = {
            userID: new mongoose.Types.ObjectId(decodedToken?.userId),
        };

        if (branchID) {
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
            companyID = branch?.companyID?._id ?? null;
        }

        if (companyID) {
            permissionQuery.companyID = new mongoose.Types.ObjectId(companyID);
        } else {
            return new Response(
                JSON.stringify({
                    error: "Company not found.",
                }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        const { permission, error: errorPerm } = await findPermission(permissionQuery);

        if (!permission || errorPerm || permission.status !== employeeStatusTypes.Active) {
            return new Response(
                JSON.stringify({
                    error: errorPerm || "Access denied.",
                }),
                {
                    status: 403,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        return new Response(JSON.stringify({ permission }), {
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
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
}
