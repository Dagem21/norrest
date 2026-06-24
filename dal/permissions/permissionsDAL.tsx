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
    } catch (e: any) {
        error = e.message;
    } finally {
        return { permission, error };
    }
};

export const findPermission = async (query: object) => {
    let permission,
        error = null;
    try {
        permission = (await permissionSchema.findOne(query).lean()) as permissionSch | null;
    } catch (e: any) {
        error = e.message;
    } finally {
        return { permission, error };
    }
};

export const findPermissions = async (query: object) => {
    let permissions,
        error = null;
    try {
        permissions = await permissionSchema.aggregate([
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
                $unwind: {
                    path: "$company",
                    preserveNullAndEmptyArrays: true,
                },
            },
            { $unset: "company.userID" },
            {
                $lookup: {
                    from: "branches",
                    localField: "branchID",
                    foreignField: "_id",
                    as: "branch",
                },
            },
            {
                $unwind: {
                    path: "$branch",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userID",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: true,
                },
            },
            { $unset: "user.password" },
        ]);
    } catch (e: any) {
        error = e.message;
    } finally {
        return { permissions, error };
    }
};

export const createPermission = async (permission: object) => {
    let result,
        error = null;
    try {
        result = await permissionSchema.create(permission);
    } catch (e: any) {
        error = e.message;
    } finally {
        return { result, error };
    }
};

export const updatePermission = async (id: string, update: object) => {
    let result,
        error = null;
    try {
        const permissionUp = await permissionSchema.findByIdAndUpdate(id, update);
        result = permissionUp !== null;
    } catch (e: any) {
        error = e.message;
    } finally {
        return { result, error };
    }
};

export const findUserCompanies = async (query: object, page: number = 1, limit: number = 10) => {
    let permission,
        error = null;
    try {
        const permissions = await permissionSchema.aggregate([
            {
                $match: query,
            },
            { $skip: (page - 1) * limit },
            { $limit: limit },
            {
                $lookup: {
                    from: "companies",
                    localField: "companyID",
                    foreignField: "_id",
                    as: "company",
                },
            },
            { $unwind: { path: "$company", preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: "branches",
                    let: {
                        currentBranch: "$branchID",
                        currentCompany: "$companyID",
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $cond: {
                                        if: { $ne: ["$$currentBranch", null] },
                                        then: { $eq: ["$_id", "$$currentBranch"] },
                                        else: { $eq: ["$companyID", "$$currentCompany"] },
                                    },
                                },
                            },
                        },
                    ],
                    as: "branches",
                },
            },
        ]);
        const total = await permissionSchema.countDocuments(query);
        const totalPages = Math.ceil((total ?? 0) / limit);
        permission = { permissions, page, limit, total, totalPages };
    } catch (e: any) {
        error = e.message;
    } finally {
        return { permission, error };
    }
};
