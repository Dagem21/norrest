import { findUserByID } from "@/dal/user/userDAL";
import { generateToken, verifyRefreshToken } from "@/utils/token";
import { headers } from "next/headers";

export async function GET() {
    const headersList = await headers();
    const token = headersList.get("Authorization");

    try {
        if (!token) {
            return new Response(JSON.stringify({ error: "Missing token from header." }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }

        const verifiedToken = verifyRefreshToken(token);
        const { user, error } = await findUserByID(verifiedToken?.userId);

        if (user && !error) {
            const newToken = generateToken({
                userId: user?._id,
                email: user?.email,
                phoneNumber: user?.phoneNumber,
            });
            return new Response(
                JSON.stringify({
                    token: newToken,
                }),
                {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                },
            );
        } else {
            return new Response(JSON.stringify({ error }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    }
}
