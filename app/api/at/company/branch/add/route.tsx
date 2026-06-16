import { permissionTypes } from "@/assets/enums/enum";
import { createBranch } from "@/dal/company/branchDAL";
import { findPermission } from "@/dal/permissions/permissionsDAL";
import { verifyUserAuth } from "@/utils/authHelper";
import { formatBranch } from "@/utils/format";
import branchSchema from "@/yup/company/branch";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    let { branch } = body;

    try {
        const decodedToken = await verifyUserAuth();

        const validatedBranch = await branchSchema.validate(branch, { abortEarly: false });
        const formattedbranch = formatBranch(validatedBranch);

        const { permission, error } = await findPermission({
            companyID: formattedbranch?.companyID,
            userID: decodedToken?.userId
        });

        if (!permission || error) {
            return new Response(
                JSON.stringify({ error: error || "You do not have permission to perform this action." }),
                {
                    status: 401,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        if (permission?.branchID || !permission?.permissions.includes(permissionTypes.Admin)) {
            return new Response(
                JSON.stringify({ error: "You do not have permission to perform this action." }),
                {
                    status: 401,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        const { result, error: errorCreate } = await createBranch(formattedbranch);

        if (result && !errorCreate) {
            return new Response(JSON.stringify({ message: "Branch Registered." }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            return new Response(
                JSON.stringify({ error: errorCreate }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }
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
