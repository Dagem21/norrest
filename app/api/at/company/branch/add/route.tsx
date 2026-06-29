import { orderStatusTypes, permissionTypes } from "@/assets/enums/enum";
import { createBranch } from "@/dal/company/branchDAL";
import { createOrderCount } from "@/dal/order/orderCountDAL";
import { findPermission } from "@/dal/permissions/permissionsDAL";
import { verifyUserAuth } from "@/utils/authHelper";
import { formatBranch } from "@/utils/format";
import branchSchema from "@/yup/company/branch";
import { NextRequest } from "next/server";
import { object } from "yup";

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

        if (permission?.branchID || !permission?.permissions.includes(permissionTypes.Admin)) {
            return new Response(
                JSON.stringify({ error: "You do not have permission to perform this action." }),
                {
                    status: 403,
                    headers: { "Content-Type": "application/json" },
                },
            );
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
