import { orderStatusTypes } from "@/assets/enums/enum";
import { createOrderCount } from "@/dal/order/orderCountDAL";
import { createUser } from "@/dal/user/userDAL";
import { formatUser } from "@/utils/format";
import userSchema from "@/yup/userRegistration/userRegisteration";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    let { user } = body;

    try {
        const validatedUser = await userSchema.validate(user, { abortEarly: false });

        const formattedUser = await formatUser(validatedUser);
        let { result, error } = await createUser(formattedUser);

        if (result && !error) {
            const orderCount = {
                userID: result?._id,
                counts: Object.values(orderStatusTypes).map((status) => {
                    return {
                        status,
                        count: 0,
                    };
                }),
            };
            const { result: resultOC, error: errorOC } = await createOrderCount(orderCount);

            return new Response(JSON.stringify({ message: "Registeration successful." }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            return new Response(JSON.stringify({ error }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
}
