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
        .png({
            palette: true,
            compressionLevel: 9,
            quality: 60
        })
        .toBuffer();

    const fileExtension = path.extname(imageFile.name) || ".jpg";

    const uniqueId = crypto.randomBytes(4).toString('hex');
    const currTIme = Date.now().toString(36);

    const fileName0 = crypto.createHash('sha256').update(currTIme + uniqueId + 'a').digest('hex');
    const fileName1 = crypto.createHash('sha256').update(currTIme + uniqueId + 'b').digest('hex');

    const uniqueFilename0 = `${fileName0}${fileExtension}`;
    const uniqueFilename1 = `${fileName1}${fileExtension}`;

    return [
        { name: uniqueFilename0, image: downscaledBuffer },
        { name: uniqueFilename1, image: buffer },
    ];
}
