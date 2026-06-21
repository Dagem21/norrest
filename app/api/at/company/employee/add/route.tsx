import { permissionTypes } from "@/assets/enums/enum";
import { createPermission, findPermission } from "@/dal/permissions/permissionsDAL";
import { findUser } from "@/dal/user/userDAL";
import { verifyUserAuth } from "@/utils/authHelper";
import { formatPhone } from "@/utils/format";
import employeeSchema from "@/yup/userRegistration/companyEmployee";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    let { employee } = body;

    try {
        const decodedToken = await verifyUserAuth();

        const validatedUser = await employeeSchema.validate(employee, { abortEarly: false });
        const formattedPhone = formatPhone(employee?.phoneNumber);

        const { permission, error: errorPerm } = await findPermission({
            companyID: validatedUser?.companyID,
            userID: decodedToken?.userId,
        });

        if (!permission || errorPerm) {
            return new Response(
                JSON.stringify({
                    error: errorPerm || "You do not have permission to perform this action.",
                }),
                {
                    status: 403,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        if (
            (permission?.branchID && permission?.branchID !== validatedUser?.branchID) ||
            !permission?.permissions.includes(permissionTypes.Admin)
        ) {
            return new Response(
                JSON.stringify({ error: "You do not have permission to perform this action." }),
                {
                    status: 403,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        const { user, error } = await findUser({ phoneNumber: formattedPhone });

        if (user && !error) {
            const permission = {
                companyID: validatedUser?.companyID,
                branchID: validatedUser?.branchID,
                userID: user?._id,
                role: validatedUser?.role,
                permissions: validatedUser?.permissions,
                creatorID: decodedToken?.userId,
            };

            const { result: permResult, error: permError } = await createPermission(permission);
            if (permResult && !permError) {
                return new Response(JSON.stringify({ message: "Employee Registered." }), {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                });
            } else {
                return new Response(JSON.stringify({ error: permError }), {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                });
            }
        } else {
            return new Response(
                JSON.stringify({ error: error || "No user found with this number." }),
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
