import * as yup from "yup";
import userSchema from "@/yup/userRegistration/userRegisteration";
import { hashPassword } from "./encryption";
import companySchema from "@/yup/company/company";

export function formatPhone(phone: string): string {
    phone = "+251" + phone.slice(-9);
    return phone;
}

export async function formatUser(user: yup.InferType<typeof userSchema>): Promise<object> {
    user.phoneNumber = "+251" + user.phoneNumber.slice(-9);
    user.password = await hashPassword(user.password);

    return user;
}

export async function formatCompany(company: yup.InferType<typeof companySchema>): Promise<object> {
    company.phoneNumber = "+251" + company.phoneNumber.slice(-9);

    return company;
}
