import * as yup from "yup";
import mongoose from "mongoose";
import companySch from "@/yup/company/company";

require("@/models/company");
const companySchema = mongoose.model("companies");

export const findCompanyByID = async (id?: string) => {
    let company,
        error = null;
    try {
        company = (await companySchema.findById(id).lean()) as yup.InferType<
            typeof companySch
        > | null;
    } catch (e: any) {
        error = e.message;
    } finally {
        return { company, error };
    }
};

export const findCompany = async (query: object) => {
    let company,
        error = null;
    try {
        company = (await companySchema.findOne(query).lean()) as yup.InferType<
            typeof companySch
        > | null;
    } catch (e: any) {
        error = e.message;
    } finally {
        return { company, error };
    }
};

export const createCompany = async (company: object) => {
    let result,
        error = null;
    try {
        result = await companySchema.create(company);
    } catch (e: any) {
        error = e.message;
    } finally {
        return { result, error };
    }
};

export const updateCompany = async (id: mongoose.Types.ObjectId, update: object) => {
    let result,
        error = null;
    try {
        const companyUp = await companySchema.findByIdAndUpdate(id, { $set: update });
        result = companyUp !== null;
    } catch (e: any) {
        error = e.message;
    } finally {
        return { result, error };
    }
};
