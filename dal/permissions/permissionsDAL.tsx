import mongoose from "mongoose";
require("@/models/permissions");

interface permissionSch {
    companyID: string;
    branchID: string;
    userID: string;
    role: string;
    permissions: [string];
}

const permissionSchema = mongoose.model("permissions");

export const findPermissionByID = async (id?: string) => {
    let permission,
        error = null;
    try {
        permission = (await permissionSchema.findById(id).lean()) as permissionSch | null;
    } catch (e) {
        error = e;
    } finally {
        return { permission, error };
    }
};

export const findPermission = async (query: object) => {
    let permission,
        error = null;
    try {
        permission = (await permissionSchema.findOne(query).lean()) as permissionSch | null;
    } catch (e) {
        error = e;
    } finally {
        return { permission, error };
    }
};

export const createPermission = async (permission: object) => {
    let result,
        error = null;
    try {
        result = await permissionSchema.create(permission);
    } catch (e) {
        error = e;
    } finally {
        return { result, error };
    }
};

export const updatePermission = async (id: mongoose.Types.ObjectId, update: object) => {
    let result,
        error = null;
    try {
        const permissionUp = await permissionSchema.findByIdAndUpdate(id, { $set: update });
        result = permissionUp.modifiedCount === 1;
    } catch (e) {
        error = e;
    } finally {
        return { result, error };
    }
};

export const findUserCompanies = async (query: object) => {
    let permission,
        error = null;
    try {
        console.log(query);
        permission = await permissionSchema.aggregate([
            {
                $match: query,
            },
            {
                $lookup: {
                    from: "companies",
                    localField: "companyID",
                    foreignField: "_id",
                    as: "company",
                },
            },
            {
                $unwind: "$company",
            },
        ]);
    } catch (e) {
        error = e;
    } finally {
        return { permission, error };
    }
};
