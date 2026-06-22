import { findRatings } from "@/dal/menu/ratingDAL";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request?.nextUrl?.searchParams;
    const menuID = searchParams.get("menuID");

    try {
        if (!menuID) {
            return new Response(JSON.stringify({ error: "Missing menu item ID." }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }
        const { ratings, error } = await findRatings({
            menuID: new mongoose.Types.ObjectId(menuID),
        });

        if (!ratings || error) {
            return new Response(
                JSON.stringify({
                    error: error || "Rating not found.",
                }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        return new Response(JSON.stringify({ ratings }), {
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
