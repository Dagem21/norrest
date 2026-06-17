import path from "path";
import sharp from "sharp";
import crypto from "crypto";

export async function createFile(imageFile: File): Promise<[object, object]> {
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const downscaledBuffer = await sharp(buffer)
        .resize({
            width: 400,
            height: 400,
            fit: "inside",
            withoutEnlargement: true,
        })
        .jpeg({ quality: 60 })
        .toBuffer();

    const fileExtension = path.extname(imageFile.name) || ".jpg";

    const fileName0 = crypto.randomBytes(16).toString("hex");
    const fileName1 = crypto.randomBytes(16).toString("hex");

    const uniqueFilename0 = `${fileName0}${fileExtension}`;
    const uniqueFilename1 = `${fileName1}${fileExtension}`;

    return [
        { name: uniqueFilename0, image: downscaledBuffer },
        { name: uniqueFilename1, image: buffer },
    ];
}
