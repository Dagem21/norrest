import { permissionTypes, roleTypes } from "@/assets/enums/enum";
import { createCompany } from "@/dal/company/companyDAL";
import { createPermission } from "@/dal/permissions/permissionsDAL";
import { verifyUserAuth } from "@/utils/authHelper";
import { formatCompany } from "@/utils/format";
import companySchema from "@/yup/company/company";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    let { company } = body;

    try {
        const decodedToken = await verifyUserAuth();

        const validatedUser = await companySchema.validate(company, { abortEarly: false });

        const formattedCompany = formatCompany(validatedUser);
        const registerCompany = { ...formattedCompany, userID: decodedToken?.userId };

        let { result, error } = await createCompany(registerCompany);

        if (result && !error) {
            const permission = {
                companyID: result?._id,
                branchID: null,
                userID: decodedToken?.userId,
                role: roleTypes.Owner,
                permissions: [
                    permissionTypes.Admin,
                    permissionTypes.Read,
                    permissionTypes.Create,
                    permissionTypes.Delete,
                    permissionTypes.Update,
                ],
            };

            const { result: permResult, error: permError } = await createPermission(permission);
            if (permResult && !permError) {
                return new Response(JSON.stringify({ message: "Company Registered." }), {
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
            return new Response(JSON.stringify({ error }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }
    } catch (error: any) {
        console.log(error);
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
