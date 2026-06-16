import { headers } from "next/headers";
import { verifyToken } from "./token";

export async function verifyUserAuth() {
    const list = await headers();
    const authHeader = list.get("authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        throw new Error("Unauthorized");
    }

    try {
        const decoded = verifyToken(token);
        return decoded;
    } catch (error) {
        throw new Error("Unauthorized");
    }
}
