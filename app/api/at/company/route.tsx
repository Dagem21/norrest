import { permissionTypes } from "@/assets/enums/enum";
import { findCompanyByID } from "@/dal/company/companyDAL";
import { findPermission, findUserCompanies } from "@/dal/permissions/permissionsDAL";
import { verifyUserAuth } from "@/utils/authHelper";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request?.nextUrl?.searchParams;
    const page = searchParams.get("page") ?? "1";
    const limit = searchParams.get("limit") ?? "10";
    const companyID = searchParams.get("companyID");

    try {
        const decodedToken = await verifyUserAuth();

        if (companyID) {
            const { permission, error } = await findPermission({
                companyID: companyID,
                userID: decodedToken?.userId,
            });

            if (!permission || error) {
                return new Response(
                    JSON.stringify({
                        error: error || "You do not have permission to perform this action.",
                    }),
                    {
                        status: 403,
                        headers: { "Content-Type": "application/json" },
                    },
                );
            }

            if (permission?.branchID) {
                return new Response(
                    JSON.stringify({ error: "You do not have permission to perform this action." }),
                    {
                        status: 403,
                        headers: { "Content-Type": "application/json" },
                    },
                );
            }

            const { company, error: companyError } = await findCompanyByID(companyID);
            if (!company || companyError) {
                return new Response(JSON.stringify({ error: companyError ?? "Company not found." }), {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                });
            }
            return new Response(JSON.stringify({ company }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }

        let { permission, error } = await findUserCompanies(
            {
                userID: new mongoose.Types.ObjectId(decodedToken?.userId),
            },
            parseInt(page),
            parseInt(limit),
        );

        if (!permission || error) {
            return new Response(
                JSON.stringify({
                    error: error || "You do not have permission to perform this action.",
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
        return new Response(JSON.stringify({ error }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
}
