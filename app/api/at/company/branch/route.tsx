import { permissionTypes } from "@/assets/enums/enum";
import { findBranchByID, findBranchs } from "@/dal/company/branchDAL";
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

        const permissionQuery: permssionQueryType = {
            userID: new mongoose.Types.ObjectId(decodedToken?.userId),
        };

        if (companyID) {
            console.log;
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
        console.log(permissionQuery);

        const { permission, error: errorPerm } = await findPermission(permissionQuery);

        if (!permission || errorPerm) {
            return new Response(
                JSON.stringify({
                    error:
                        errorPerm ||
                        "You do not have permission to access branches of this company.",
                }),
                {
                    status: 403,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        if (
            (permission?.branchID && !branchID) ||
            !permission?.permissions.includes(permissionTypes.Admin)
        ) {
            return new Response(
                JSON.stringify({
                    error: "You do not have permission to access branches of this company.",
                }),
                {
                    status: 403,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        if (branchID) {
            const { branch, error } = await findBranchByID(branchID);
            if (!branch || error) {
                return new Response(JSON.stringify({ error }), {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                });
            }

            return new Response(JSON.stringify({ branch }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
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
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
}
