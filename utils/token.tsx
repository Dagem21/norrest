import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "super-backups-secret-key";

interface TokenPayload {
    userId?: string;
    email?: string;
    phoneNumber?: string;
}

export function generateToken(payload: TokenPayload): object {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    return {
        token: token,
        expiresIn: "1h",
        tokenType: "Bearer",
    };
}

export function generateRefreshToken(userId?: string): object {
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
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
        return jwt.verify(token, JWT_SECRET) as TokenPayload;
    } catch (error) {
        throw new Error("Invalid or expired token");
    }
}
