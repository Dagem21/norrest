import * as yup from "yup";
import userSchema from "@/yup/userRegistration/userRegisteration";
import { hashPassword } from "./encryption";

export async function formatUser(user: yup.InferType<typeof userSchema>): Promise<object> {
    user.phoneNumber = "+251" + user.phoneNumber;
    user.password = await hashPassword(user.password);

    return user;
}
