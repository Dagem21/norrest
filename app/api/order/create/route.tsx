import { orderStatusTypes, permissionTypes } from "@/assets/enums/enum";
import { createOrder } from "@/dal/order/orderDAL";
import { verifyUserAuth } from "@/utils/authHelper";
import orderSchema from "@/yup/order/order";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { order } = body;

    try {
        const validOrder = await orderSchema.validate(order, { abortEarly: false });
        try {
            const decodedToken = await verifyUserAuth();
            order.userID = decodedToken.userId;
        } catch (error: any) {
            if (
                error.message === "Unauthorized" &&
                validOrder?.status !== orderStatusTypes.Pending
            ) {
                return new Response(
                    JSON.stringify({ error: "Please login again to save your order!" }),
                    {
                        status: 403,
                        headers: { "Content-Type": "application/json" },
                    },
                );
            }
        }

        const { result, error } = await createOrder(validOrder);

        if (!result || error) {
            return new Response(JSON.stringify({ error }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ order: result, message: "Order created." }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        if (error.message === "Unauthorized") {
            return new Response(JSON.stringify({ error: "Session expired. Please login again!" }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }
        console.log(error);
        return new Response(JSON.stringify({ error }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
}
