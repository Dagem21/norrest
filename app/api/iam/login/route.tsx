import { findUser } from "@/dal/user/userDAL";
import { verifyPassword } from "@/utils/encryption";
import { generateRefreshToken, generateToken } from "@/utils/token";
import { validateEmail, validatePhone } from "@/utils/validation";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

type PhoneQuery = { phoneNumber: string };
type EmailQuery = { email: string };
type DatabaseQuery = PhoneQuery | EmailQuery;

export async function POST(request: NextRequest) {
    const body = await request.json();
    let { identifier, password } = body;

    try {
        const isValidPhone = validatePhone(identifier);
        const isValidEmail = validateEmail(identifier);

        let userQuery: DatabaseQuery;
        if (isValidPhone) {
            userQuery = { phoneNumber: identifier };
        } else if (isValidEmail) {
            userQuery = { email: identifier };
        } else {
            return new Response(JSON.stringify({ error: "Invalid credentials provided." }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }

        let { user, error } = await findUser(userQuery);

        if (user && !error) {
            const { password: savedPass, ...loggedUser } = user;
            const checkPassword = await verifyPassword(password, savedPass);
            if (checkPassword) {
                const token = generateToken({
                    userId: loggedUser?._id,
                    email: loggedUser?.email,
                    phoneNumber: loggedUser?.phoneNumber,
                });

                const cookieStore = await cookies();
                cookieStore.set({
                    name: 'session_token',
                    value: token?.token,
                    httpOnly: true,
                    secure: true,
                    sameSite: 'lax',
                    maxAge: 60 * 60 * 24 * 1,
                    path: '/',
                });

                return new Response(
                    JSON.stringify({
                        user: loggedUser,
                        message: "Logged in.",
                    }),
                    {
                        status: 200,
                        headers: { "Content-Type": "application/json" },
                    },
                );
            } else {
                return new Response(JSON.stringify({ error: "Invalid credentials provided." }), {
                    status: 401,
                    headers: { "Content-Type": "application/json" },
                });
            }
        } else {
            return new Response(JSON.stringify({ error: "Invalid credentials provided." }), {
                status: 401,
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
