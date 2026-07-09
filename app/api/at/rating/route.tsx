import { findRatings } from "@/dal/menu/ratingDAL";
import mongoose from "mongoose";
import { NextRequest } from "next/server";
import { createUpdateRating } from "@/dal/menu/ratingDAL";
import { verifyUserAuth } from "@/utils/authHelper";
import ratingSchema from "@/yup/menu/rating";
import { findBranchByID, updateBranch } from "@/dal/company/branchDAL";

export async function POST(request: NextRequest) {
    const body = await request.json();
    let { rating } = body;

    try {
        const decodedToken = await verifyUserAuth();

        const validatedRating = await ratingSchema.validate(rating, { abortEarly: false });

        const { branch, error } = await findBranchByID(validatedRating?.branchID);
        if (!branch || error) {
            return new Response(
                JSON.stringify({
                    error: error || "Branch not found.",
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
            branchID: validatedRating.branchID,
        };

        const { result, error: errorCU } = await createUpdateRating(ratingQuery, validatedRating);

        if (!errorCU) {
            const totalOldRating = (branch?.rating || 0) * (branch?.totalRatings || 0);
            let newRating = 0;
            let newTotalRating = branch?.totalRatings || 0;

            if (result) {
                const totalNewRating =
                    totalOldRating - (result?.rating || 0) + validatedRating?.rating;
                newRating = totalNewRating / (newTotalRating || 1);
            } else {
                newTotalRating += 1;
                const totalNewRating = totalOldRating + validatedRating?.rating;
                newRating = totalNewRating / newTotalRating;
            }

            const branchUpdate = {
                rating: newRating,
                totalRatings: newTotalRating,
            };
            const { result: updateResult, error: updateError } = await updateBranch(
                validatedRating?.branchID || "",
                branchUpdate,
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
        const { ratings, error } = await findRatings({
            branchID: new mongoose.Types.ObjectId(branchID),
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
