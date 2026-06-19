import { permissionTypes, roleTypes } from "@/assets/enums/enum";
import { findBranchs } from "@/dal/company/branchDAL";
import {
    createPermission,
    findPermission,
    findUserCompanies,
} from "@/dal/permissions/permissionsDAL";
import { verifyUserAuth } from "@/utils/authHelper";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request?.nextUrl?.searchParams;
    const companyID = searchParams.get("companyID");
    try {
        const decodedToken = await verifyUserAuth();

        if (!companyID) {
            return new Response(JSON.stringify({ error: "Missing company ID." }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const { permission, error: errorPerm } = await findPermission({
            companyID: companyID,
            userID: decodedToken?.userId,
        });

        if (!permission || errorPerm) {
            return new Response(
                JSON.stringify({
                    error: errorPerm || "You do not have permission to access this menu.",
                }),
                {
                    status: 401,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        if (permission?.branchID || !permission?.permissions.includes(permissionTypes.Admin)) {
            return new Response(
                JSON.stringify({
                    error: "You do not have permission to access branches of this company.",
                }),
                {
                    status: 401,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        const { branches, error } = await findBranchs({ companyID });

        if (!branches || error) {
            return new Response(JSON.stringify({ error }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ branches }), {
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
