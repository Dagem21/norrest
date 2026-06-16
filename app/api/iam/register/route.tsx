import { createUser } from "@/dal/user/userDAL";
import { formatUser } from "@/utils/format";
import userSchema from "@/yup/userRegistration/userRegisteration";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    let { user } = body;

    try {
        const validatedUser = await userSchema.validate(user, { abortEarly: false });

        const formattedUser = await formatUser(validatedUser);
        let { result, error } = await createUser(formattedUser);

        if (result && !error) {
            return new Response(JSON.stringify({ message: "Registeration successful." }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            return new Response(JSON.stringify({ error }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
}
