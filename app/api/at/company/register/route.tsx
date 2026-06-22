import { permissionTypes, roleTypes } from "@/assets/enums/enum";
import { createCompany } from "@/dal/company/companyDAL";
import { createPermission } from "@/dal/permissions/permissionsDAL";
import { verifyUserAuth } from "@/utils/authHelper";
import { createFile } from "@/utils/createFile";
import { formatCompany } from "@/utils/format";
import { uploadImage } from "@/utils/uploadImage";
import companySchema from "@/yup/company/company";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const formData = await request.formData();

    try {
        const decodedToken = await verifyUserAuth();

        const company = {
            name: formData?.get("name"),
            email: formData?.get("email"),
            phoneNumber: formData?.get("phoneNumber"),
            website: formData?.get("website"),
            picture: formData?.get("picture"),
        };

        const validatedCompany = await companySchema.validate(company, { abortEarly: false });

        const formattedCompany = formatCompany(validatedCompany);
        const registerCompany = { ...formattedCompany, userID: decodedToken?.userId };

        const imageBuffers = await createFile(validatedCompany?.picture as File);

        const urls = await uploadImage(imageBuffers);
        registerCompany.picture = urls;

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
