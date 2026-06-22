import { permissionTypes } from "@/assets/enums/enum";
import { findBranchByID } from "@/dal/company/branchDAL";
import { createMenu } from "@/dal/menu/menuDAL";
import { findPermission } from "@/dal/permissions/permissionsDAL";
import { verifyUserAuth } from "@/utils/authHelper";
import { createFile } from "@/utils/createFile";
import { uploadImage } from "@/utils/uploadImage";
import menuSchema from "@/yup/menu/menuItem";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const formData = await request.formData();

    try {
        const menuItem = {
            branchID: formData?.get("branchID"),
            name: formData?.get("name"),
            price: formData?.get("price"),
            ingredients: formData?.get("ingredients"),
            category: formData?.get("category") as string,
            picture: formData?.get("picture"),
        };

        console.log(menuItem);

        menuItem.category = JSON.parse(menuItem.category);

        const decodedToken = await verifyUserAuth();

        const validatedMenuItem = await menuSchema.validate(menuItem, { abortEarly: false });

        const { branch, error: branchError } = await findBranchByID(validatedMenuItem?.branchID);
        if (!branch || branchError) {
            return new Response(
                JSON.stringify({
                    error: branchError || "Branch not found.",
                }),
                {
                    status: 404,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        const { permission, error: errorPerm } = await findPermission({
            companyID: branch?.companyID,
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
            (permission?.branchID && permission?.branchID !== validatedMenuItem?.branchID) ||
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

        const imageBuffers = await createFile(validatedMenuItem?.picture as File);

        const urls = await uploadImage(imageBuffers);
        validatedMenuItem.picture = urls;

        const { result, error } = await createMenu({
            inputter: decodedToken?.userId,
            ...validatedMenuItem,
        });

        if (result && !error) {
            return new Response(JSON.stringify({ message: "Item added to menu." }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            return new Response(JSON.stringify({ error: error || "Could not add item to menu." }), {
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
        console.log(error);
        return new Response(JSON.stringify({ error }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
}
