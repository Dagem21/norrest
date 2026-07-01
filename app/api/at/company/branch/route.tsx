import { branchStatusTypes, employeeStatusTypes, orderStatusTypes, permissionTypes } from "@/assets/enums/enum";
import { findBranchByID, findBranchs, updateBranch } from "@/dal/company/branchDAL";
import { findPermission } from "@/dal/permissions/permissionsDAL";
import { verifyUserAuth } from "@/utils/authHelper";
import mongoose from "mongoose";
import { NextRequest } from "next/server";
import { createBranch } from "@/dal/company/branchDAL";
import { createOrderCount } from "@/dal/order/orderCountDAL";
import { formatBranch } from "@/utils/format";
import branchSchema from "@/yup/company/branch";
import branchUpdateSchema from "@/yup/company/branchUpdate";

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

        let branch;
        if (branchID) {
            const findRes = await findBranchByID(branchID);
            if (!findRes.branch || findRes.error) {
                return new Response(
                    JSON.stringify({
                        error: findRes.error || "Branch not found.",
                    }),
                    {
                        status: 400,
                        headers: { "Content-Type": "application/json" },
                    },
                );
            }
            branch = findRes.branch;
            companyID = branch?.companyID?._id ?? null;
        }

        const permissionQuery: permssionQueryType = {
            userID: new mongoose.Types.ObjectId(decodedToken?.userId),
        };

        if (companyID) {
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

        const { permission, error: errorPerm } = await findPermission(permissionQuery);

        if (!permission || errorPerm || permission.status !== employeeStatusTypes.Active) {
            return new Response(
                JSON.stringify({
                    error: errorPerm || "Access denied.",
                }),
                {
                    status: 403,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        if (permission?.branchID && !branchID) {
            return new Response(
                JSON.stringify({
                    error: "Access denied.",
                }),
                {
                    status: 403,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        if (branchID) {
            return new Response(JSON.stringify({ branch }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }

        const { branches, error } = await findBranchs({ companyID, status: { $ne: branchStatusTypes.Deleted } });

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
            return new Response(JSON.stringify({ error: "Session expired. Please login again!" }), {
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

export async function POST(request: NextRequest) {
    const body = await request.json();
    let { branch } = body;

    try {
        const decodedToken = await verifyUserAuth();

        const validatedBranch = await branchSchema.validate(branch, { abortEarly: false });
        const formattedbranch = formatBranch(validatedBranch);

        const { permission, error } = await findPermission({
            companyID: formattedbranch?.companyID,
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

        if (
            permission?.branchID ||
            permission.status !== employeeStatusTypes.Active ||
            !permission?.permissions.includes(permissionTypes.Admin)
        ) {
            return new Response(JSON.stringify({ error: "Access denied." }), {
                status: 403,
                headers: { "Content-Type": "application/json" },
            });
        }

        const { result, error: errorCreate } = await createBranch(formattedbranch);

        if (result && !errorCreate) {
            const orderCount = {
                branchID: result?._id,
                counts: Object.values(orderStatusTypes).map((status) => {
                    return {
                        status,
                        count: 0,
                    };
                }),
            };
            const { result: resultOC, error: errorOC } = await createOrderCount(orderCount);

            return new Response(JSON.stringify({ message: "Branch Registered." }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            return new Response(JSON.stringify({ error: errorCreate }), {
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

export async function PUT(request: NextRequest) {
    const searchParams = request?.nextUrl?.searchParams;
    const branchID = searchParams.get("branchID");

    const body = await request.json();
    let { branch: newBranch } = body;
    try {
        const decodedToken = await verifyUserAuth();

        const validatedBranch = await branchUpdateSchema.validate(newBranch, { abortEarly: false });

        const formattedBranch = formatBranch(validatedBranch);

        Object.keys(formattedBranch).forEach((key) => {
            if (!formattedBranch[key]) delete formattedBranch[key];
        });

        if (!branchID) {
            return new Response(JSON.stringify({ error: "Missing branch ID." }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

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

        const permissionQuery: permssionQueryType = {
            userID: new mongoose.Types.ObjectId(decodedToken?.userId),
            companyID: branch?.companyID,
        };

        const { permission, error: errorPerm } = await findPermission(permissionQuery);

        if (
            !permission ||
            errorPerm ||
            permission.status !== employeeStatusTypes.Active ||
            (permission?.branchID && permission?.branchID !== branchID)
        ) {
            return new Response(
                JSON.stringify({
                    error: errorPerm || "Access denied.",
                }),
                {
                    status: 403,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        const { result, error } = await updateBranch(branchID, formattedBranch);

        if (!result || error) {
            return new Response(JSON.stringify({ error }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ message: "Branch updated." }), {
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
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export async function DELETE(request: NextRequest) {
    const searchParams = request?.nextUrl?.searchParams;
    const companyID = searchParams.get("companyID");

    const body = await request.json();
    let { branchID } = body;
    try {
        const decodedToken = await verifyUserAuth();

        if (!companyID) {
            return new Response(JSON.stringify({ error: "Missing company ID." }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

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

        const permissionQuery: permssionQueryType = {
            userID: new mongoose.Types.ObjectId(decodedToken?.userId),
            companyID: new mongoose.Types.ObjectId(companyID),
        };

        const { permission, error: errorPerm } = await findPermission(permissionQuery);

        if (
            !permission ||
            errorPerm ||
            permission.status !== employeeStatusTypes.Active ||
            permission?.branchID ||
            !permission?.permissions.includes(permissionTypes.Admin)
        ) {
            return new Response(
                JSON.stringify({
                    error: errorPerm || "Access denied.",
                }),
                {
                    status: 403,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        const { result, error } = await updateBranch(branchID, { status: branchStatusTypes.Deleted });

        if (!result || error) {
            return new Response(JSON.stringify({ error }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ message: "Branch removed." }), {
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
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
}
