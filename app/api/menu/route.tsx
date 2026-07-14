import { branchStatusTypes } from "@/assets/enums/enum";
import { findBranchByID } from "@/dal/company/branchDAL";
import { findMenus } from "@/dal/menu/menuDAL";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request?.nextUrl?.searchParams;
    const branchID = searchParams.get("branchID");

    try {
        if (!branchID) {
            return new Response(JSON.stringify({ error: "Missing branch ID." }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }
        const { branch, error: branchError } = await findBranchByID(branchID);
        if (!branch || branchError || branch.status !== branchStatusTypes.Active) {
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

        const { items, error } = await findMenus({ branchID, status: { $ne: "Deleted" } });
        if (!items || error) {
            return new Response(JSON.stringify({ error }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ branch, items }), {
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
        console.log(error);
        return new Response(JSON.stringify({ error }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
}
