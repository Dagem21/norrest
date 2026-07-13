import path from "path";
import sharp from "sharp";
import crypto from "crypto";

export async function createFile(imageFile: File): Promise<[object, object]> {
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileExtension = path.extname(imageFile.name).toLowerCase() || ".jpg";

    let sharpInstance = sharp(buffer).resize({
        width: 400,
        height: 400,
        fit: "inside",
        withoutEnlargement: true,
    });

    const TARGET_SIZE_BYTES = 20 * 1024;
    let minQuality = 10;
    let maxQuality = 80;
    let quality = maxQuality;
    let downscaledBuffer: Buffer;

    while (minQuality <= maxQuality) {
        quality = Math.floor((minQuality + maxQuality) / 2);

        let pipeline = sharpInstance.clone();
        if (fileExtension === ".png") {
            pipeline = pipeline.png({
                palette: true,
                compressionLevel: 9,
                quality: quality
            });
        } else {
            pipeline = pipeline.jpeg({ quality: quality, mozjpeg: true });
        }

        downscaledBuffer = await pipeline.toBuffer();

        if (downscaledBuffer.length > TARGET_SIZE_BYTES) {
            maxQuality = quality - 1;
        } else {
            minQuality = quality + 1;
        }
    }

    if (downscaledBuffer!.length > TARGET_SIZE_BYTES) {
        downscaledBuffer = await sharpInstance
            .clone()
            .jpeg({ quality: 5, mozjpeg: true })
            .toBuffer();
    }

    const uniqueId = crypto.randomBytes(4).toString('hex');
    const currTime = Date.now().toString(36);

    const fileName0 = crypto.createHash('sha256').update(currTime + uniqueId + 'a').digest('hex');
    const fileName1 = crypto.createHash('sha256').update(currTime + uniqueId + 'b').digest('hex');

    const uniqueFilename0 = `${fileName0}${fileExtension}`;
    const uniqueFilename1 = `${fileName1}${fileExtension}`;

    return [
        {
            name: uniqueFilename0,
            image: downscaledBuffer!.toString("base64"), // Serializable
            isBase64: true
        },
        {
            name: uniqueFilename1,
            image: buffer.toString("base64"), // Serializable
            isBase64: true
        },
    ];
}