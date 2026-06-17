"use server";

import { put } from "@vercel/blob";
export async function uploadImage(images: Array<any>): Promise<string[]> {
    const fileNames: string[] = [];

    for (let index = 0; index < images.length; index++) {
        const image = images[index];
        const blob = await put(image?.name, image?.image, {
            access: "public",
            token: process.env.VERCEL_OIDC_TOKEN,
        });
        fileNames.push(blob.url);
    }

    return fileNames;
}
