import { createUser, updateUser } from "@/dal/user/userDAL";
import { verifyUserAuth } from "@/utils/authHelper";
import { formatUserUpdate } from "@/utils/format";
import profileUpdateSchema from "@/yup/userRegistration/updateUser";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
    const body = await request.json();
    let { user } = body;

    try {
        const decodedToken = await verifyUserAuth();
        const validatedUser = await profileUpdateSchema.validate(user, { abortEarly: false });

        const formattedUser = await formatUserUpdate(validatedUser);
        console.log(formattedUser);

        const updateQuery = { $set: formattedUser }
        let { result, error } = await updateUser(decodedToken.userId || '', updateQuery);

        if (result && !error) {
            return new Response(JSON.stringify({ message: "Update successful." }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
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
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
}
