import { createUser, findUser } from "@/dal/user/userDAL";
import { verifyPassword } from "@/utils/encryption";
import { formatUser } from "@/utils/formatUser";
import { validateEmail, validatePhone } from "@/utils/validation";
import userSchema from "@/yup/userRegistration/userRegisteration";
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
        }
        else if (isValidEmail) {
            userQuery = { email: identifier };
        }
        else {
            return new Response(JSON.stringify({ error: "Invalid credentials provided." }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }

        let { user, error } = await findUser(userQuery);

        if (user && !error) {
            const checkPassword = await verifyPassword(password, user?.password);
            if (checkPassword) {
                return new Response(JSON.stringify({ message: "Logged in." }), {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                });
            }
            else {
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
