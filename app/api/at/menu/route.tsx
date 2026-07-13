import { findBranchByID } from "@/dal/company/branchDAL";
import { findMenus } from "@/dal/menu/menuDAL";
import { findPermission } from "@/dal/permissions/permissionsDAL";
import { verifyUserAuth } from "@/utils/authHelper";
import { NextRequest } from "next/server";
import { permissionTypes } from "@/assets/enums/enum";
import { createMenu, findMenuByID, updateMenu } from "@/dal/menu/menuDAL";
import { createFile } from "@/utils/createFile";
import { uploadImage } from "@/utils/uploadImage";
import menuSchema from "@/yup/menu/menuItem";
import menuItemUpdateSchema from "@/yup/menu/menuItemUpdate";

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
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export async function PUT(request: NextRequest) {
    const formData = await request.formData();

    try {
        const menuItem: any = {
            _id: formData?.get("id"),
            name: formData?.get("name"),
            price: formData?.get("price"),
            ingredients: formData?.get("ingredients"),
            category: formData?.get("category") as string,
            picture: formData?.get("picture"),
            discount: formData?.get("discount"),
            discountStart: formData?.get("discountStart"),
            discountEnd: formData?.get("discountEnd"),
        };

        const decodedToken = await verifyUserAuth();

        Object.keys(menuItem).forEach((key) => {
            if (!menuItem[key]) delete menuItem[key];
        });

        if (menuItem?.category) {
            menuItem.category = JSON.parse(menuItem.category);
        }

        const validatedMenuItem = await menuItemUpdateSchema.validate(menuItem, {
            abortEarly: false,
        });

        const { menu, error: errorMenu } = await findMenuByID(validatedMenuItem._id);
        if (!menu || errorMenu) {
            return new Response(
                JSON.stringify({
                    error: errorMenu || "Menu item not found.",
                }),
                {
                    status: 404,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        const { branch, error: branchError } = await findBranchByID(menu?.branchID?.toString());
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

        const updateMenuItem: any = { ...validatedMenuItem };

        if (updateMenuItem?.picture) {
            const imageBuffers = await createFile(updateMenuItem?.picture as File);
            const urls = await uploadImage(imageBuffers);
            updateMenuItem.picture = urls;
        }

        const { result, error } = await updateMenu(updateMenuItem?._id, updateMenuItem);

        if (result && !error) {
            return new Response(JSON.stringify({ message: "Menu item update." }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            return new Response(JSON.stringify({ error: error || "Could not update item." }), {
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
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export async function GET(request: NextRequest) {
    const searchParams = request?.nextUrl?.searchParams;
    const branchID = searchParams.get("branchID");

    try {
        const decodedToken = await verifyUserAuth();

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

        const { permission, error: errorPerm } = await findPermission({
            companyID: branch?.companyID,
            userID: decodedToken?.userId,
        });

        if (!permission || errorPerm) {
            return new Response(
                JSON.stringify({
                    error: errorPerm || "You do not have permission to access this menu.",
                }),
                {
                    status: 403,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        if (permission?.branchID && permission?.branchID?.toString() !== branchID) {
            return new Response(
                JSON.stringify({ error: "You do not have permission to access this menu." }),
                {
                    status: 403,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        const { items, error } = await findMenus({ branchID });
        if (!items || error) {
            return new Response(JSON.stringify({ error }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ items }), {
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
