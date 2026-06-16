import * as yup from "yup";
import mongoose from "mongoose";
import branchSch from "@/yup/company/branch";

require("@/models/branches");
const branchSchema = mongoose.model("branches");

export const findBranchByID = async (id?: string) => {
    let branch,
        error = null;
    try {
        branch = (await branchSchema.findById(id).lean()) as yup.InferType<
            typeof branchSch
        > | null;
    } catch (e) {
        error = e;
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
    } catch (e) {
        error = e;
    } finally {
        return { branch, error };
    }
};

export const createBranch = async (branch: object) => {
    let result,
        error = null;
    try {
        result = await branchSchema.create(branch);
    } catch (e) {
        error = e;
    } finally {
        return { result, error };
    }
};

export const updateBranch = async (id: mongoose.Types.ObjectId, update: object) => {
    let result,
        error = null;
    try {
        const branchUp = await branchSchema.findByIdAndUpdate(id, { $set: update });
        result = branchUp.modifiedCount === 1;
    } catch (e) {
        error = e;
    } finally {
        return { result, error };
    }
};
