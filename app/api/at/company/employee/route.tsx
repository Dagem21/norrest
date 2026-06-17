import { permissionTypes, roleTypes } from "@/assets/enums/enum";
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
    const companyID = searchParams.get("companyID");
    const branchID = searchParams.get("branchID");

    try {
        const decodedToken = await verifyUserAuth();

        if (!decodedToken?.userId) {
            return new Response(
                JSON.stringify({
                    error: "You do not have permission to perform this action.",
                }),
                {
                    status: 401,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        if (!companyID) {
            return new Response(
                JSON.stringify({
                    error: "Missing company ID from params.",
                }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        const permissionQuery: permssionQueryType = {
            companyID: new mongoose.Types.ObjectId(companyID),
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
                    status: 401,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        if (
            (userPermission?.branchID && !branchID) ||
            !userPermission?.permissions.includes(permissionTypes.Admin)
        ) {
            return new Response(
                JSON.stringify({ error: "You do not have permission to perform this action." }),
                {
                    status: 401,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        if (branchID) {
            permissionQuery.branchID = new mongoose.Types.ObjectId(branchID);
        }
        delete permissionQuery.userID;

        let { permissions, error } = await findPermissions(permissionQuery);
        if (!permissions || error) {
            return new Response(JSON.stringify({ error }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            return new Response(JSON.stringify({ permissions }), {
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
