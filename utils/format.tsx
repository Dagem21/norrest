import * as yup from "yup";
import userSchema from "@/yup/userRegistration/userRegisteration";
import { hashPassword } from "./encryption";
import companySchema from "@/yup/company/company";
import branchSchema from "@/yup/company/branch";
import profileUpdateSchema from "@/yup/userRegistration/updateUser";
import companyUpdateSchema from "@/yup/company/companyUpdate";

export function formatPhone(phone: string): string {
    phone = "+251" + phone.slice(-9);
    return phone;
}

export async function formatUser(user: yup.InferType<typeof userSchema>): Promise<any> {
    user.phoneNumber = "+251" + user.phoneNumber.slice(-9);
    user.password = await hashPassword(user.password);

    return user;
}

export function formatUserUpdate(user: yup.InferType<typeof profileUpdateSchema>): any {
    if (user.phoneNumber) {
        user.phoneNumber = "+251" + user.phoneNumber.slice(-9);
    }
    return user;
}

export function formatCompany(
    company: yup.InferType<typeof companySchema> | yup.InferType<typeof companyUpdateSchema>,
): any {
    if (company.phoneNumber) company.phoneNumber = "+251" + company.phoneNumber.slice(-9);

    return company;
}

export function formatBranch(branch: yup.InferType<typeof branchSchema>): any {
    branch.phoneNumber = "+251" + branch.phoneNumber.slice(-9);

    return branch;
}
