import * as yup from "yup";
import mongoose from "mongoose";
import branchSch from "@/yup/company/branch";

require("@/models/branches");
require("@/models/company");
const branchSchema = mongoose.model("branches");

export const findBranchByID = async (id?: string) => {
    let branch,
        error = null;
    try {
        branch = (await branchSchema
            .findById(id)
            .populate({
                path: "companyID",
                select: "name picture",
            })
            .lean()) as any;
    } catch (e: any) {
        error = e.message;
    } finally {
        return { branch, error };
    }
};

export const findBranch = async (query: object) => {
    let branch,
        error = null;
    try {
        branch = (await branchSchema.findOne(query).lean()) as yup.InferType<
            typeof branchSch
        > | null;
    } catch (e: any) {
        error = e.message;
    } finally {
        return { branch, error };
    }
};

export const findBranchs = async (query: object, page: number = 1, limit: number = 10) => {
    let branches,
        error = null;
    try {
        branches = await branchSchema
            .find(query)
            .populate({
                path: "companyID",
                select: "name picture description",
            })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

        const total = await branchSchema.countDocuments(query);
        const totalPages = Math.ceil((total ?? 0) / limit);
        branches = { branches: branches, page, limit, total, totalPages };
    } catch (e: any) {
        error = e.message;
    } finally {
        return { branches, error };
    }
};

export const createBranch = async (branch: object) => {
    let result,
        error = null;
    try {
        result = await branchSchema.create(branch);
    } catch (e: any) {
        error = e.message;
    } finally {
        return { result, error };
    }
};

export const updateBranch = async (id: string, update: object) => {
    let result,
        error = null;
    try {
        const branchUp = await branchSchema.findByIdAndUpdate(id, update);
        result = branchUp !== null;
    } catch (e: any) {
        error = e.message;
    } finally {
        return { result, error };
    }
};

export const deleteBranch = async (id: string) => {
    let result,
        error = null;
    try {
        const branchUp = await branchSchema.findByIdAndDelete(id);
        result = branchUp !== null;
    } catch (e: any) {
        error = e.message;
    } finally {
        return { result, error };
    }
};
