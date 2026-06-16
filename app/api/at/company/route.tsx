import { permissionTypes, roleTypes } from "@/assets/enums/enum";
import { createPermission, findUserCompanies } from "@/dal/permissions/permissionsDAL";
import { verifyUserAuth } from "@/utils/authHelper";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const decodedToken = await verifyUserAuth();

        let { permission, error } = await findUserCompanies({
            userID: new mongoose.Types.ObjectId(decodedToken?.userId || ""),
        });
        return new Response(JSON.stringify({ permission }), {
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
