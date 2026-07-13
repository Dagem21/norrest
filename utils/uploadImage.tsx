"use server";

import { put } from "@vercel/blob";
export async function uploadImage(images: Array<any>): Promise<string[]> {
    const fileNames: string[] = [];

    for (let index = 0; index < images.length; index++) {
        const image = images[index];
        if (!image || !image.image) continue;

        // Convert the Base64 string back into a Node Buffer on the server side
        const fileData = Buffer.from(image.image, "base64");

        const blob = await put(image.name, fileData, {
            access: "public",
            token: process.env.VERCEL_OIDC_TOKEN,
        });

        fileNames.push(blob.url);
    }

    return fileNames;
}
