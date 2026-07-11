import { branchStatusTypes } from "@/assets/enums/enum";
import { findBranchs } from "@/dal/company/branchDAL";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request?.nextUrl?.searchParams;
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    try {
        const { branches, error } = await findBranchs(
            {
                status: { $ne: branchStatusTypes.Deleted },
            },
            parseInt(page || "1"),
            parseInt(limit || "10"),
        );

        if (!branches || error) {
            return new Response(JSON.stringify({ error }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify(branches), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
}
