"use server";

const SIO_url = process.env.SIO_URL;
export async function notifyOrderCreated(
    branchID: string,
    order: any,
): Promise<{ notified: boolean }> {
    const url = `${SIO_url}/notifications/send/create`;

    const payload = {
        roomId: branchID,
        message: order,
    };

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            return { notified: false };
        }
        return { notified: true };
    } catch (error) {
        return { notified: false };
    }
}
