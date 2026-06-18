import { cookies } from "next/headers";
import { generateToken, verifyToken } from "./token";

export async function verifyUserAuth() {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token');

    if (!sessionToken || !sessionToken.value) {
        throw new Error("Unauthorized");
    }

    try {
        const decoded = verifyToken(sessionToken.value)

        const newToken = generateToken({
            userId: decoded?.userId,
            email: decoded?.email,
            phoneNumber: decoded?.phoneNumber
        });
        cookieStore.set({
            name: 'session_token',
            value: newToken?.token,
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 1,
            path: '/',
        });

        return decoded;
    } catch (error) {
        throw new Error("Unauthorized");
    }
}
