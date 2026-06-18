import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "super-backups-secret-key";
const JWT_SECRET_REFRESH = process.env.JWT_SECRET_REFRESH || "super-backups-secret-key";

interface TokenPayload {
    userId?: string;
    email?: string;
    phoneNumber?: string;
}

export function generateToken(payload: TokenPayload): any {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    return {
        token: token,
        expiresIn: "1d",
        tokenType: "Bearer",
    };
}

export function generateRefreshToken(userId?: string): object {
    const token = jwt.sign({ userId }, JWT_SECRET_REFRESH, { expiresIn: "7d" });
    return {
        token: token,
        expiresIn: "7d",
        tokenType: "Bearer",
    };
}

export function verifyToken(token: string): TokenPayload {
    try {
        return jwt.verify(token, JWT_SECRET) as TokenPayload;
    } catch (error) {
        throw new Error("Invalid or expired token");
    }
}

export function verifyRefreshToken(token: string): TokenPayload {
    try {
        return jwt.verify(token, JWT_SECRET_REFRESH) as TokenPayload;
    } catch (error) {
        throw new Error("Invalid or expired token");
    }
}
