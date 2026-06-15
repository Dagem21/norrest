import argon2 from "argon2";

export async function hashPassword(password: string): Promise<string> {
    try {
        const hash = await argon2.hash(password, {
            type: argon2.argon2id,
            memoryCost: 2 ** 16,
            timeCost: 3,
            parallelism: 4,
        });
        return hash;
    } catch (error) {
        throw new Error("Password hashing failed");
    }
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    try {
        return await argon2.verify(hash, password);
    } catch (error) {
        return false;
    }
}
