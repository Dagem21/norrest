import { findMenuByID, updateMenu } from "@/dal/menu/menuDAL";
import { createUpdateRating } from "@/dal/menu/ratingDAL";
import { verifyUserAuth } from "@/utils/authHelper";
import ratingSchema from "@/yup/menu/rating";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    let { rating } = body;

    try {
        const decodedToken = await verifyUserAuth();

        const validatedRating = await ratingSchema.validate(rating, { abortEarly: false });

        const { menu, error } = await findMenuByID(validatedRating?.menuID);
        if (!menu || error) {
            return new Response(
                JSON.stringify({
                    error: error || "Menu item not found.",
                }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        validatedRating.userID = decodedToken?.userId;

        const ratingQuery = {
            userID: validatedRating.userID,
            menuID: validatedRating.menuID,
        };

        const { result, error: errorCU } = await createUpdateRating(ratingQuery, validatedRating);

        if (!errorCU) {
            const totalOldRating = (menu?.rating || 0) * (menu?.totalRatings || 0);
            let newRating = 0;
            let newTotalRating = menu?.totalRatings || 0;

            if (result) {
                const totalNewRating =
                    totalOldRating - (result?.rating || 0) + validatedRating?.rating;
                newRating = totalNewRating / (newTotalRating || 1);
            } else {
                newTotalRating += 1;
                const totalNewRating = totalOldRating + validatedRating?.rating;
                newRating = totalNewRating / newTotalRating;
            }

            const menuUpdate = {
                rating: newRating,
                totalRatings: newTotalRating,
            };
            const { result: updateResult, error: updateError } = await updateMenu(
                menu._id?.toString() || "",
                menuUpdate,
            );

            if (!updateResult || updateError) {
                return new Response(JSON.stringify({ error }), {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                });
            }

            return new Response(JSON.stringify({ message: "Rating saved." }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            return new Response(JSON.stringify({ error: errorCU }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }
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
