import { findCompanyByID, updateCompany } from "@/dal/company/companyDAL";
import { findPermission, findUserCompanies } from "@/dal/permissions/permissionsDAL";
import { verifyUserAuth } from "@/utils/authHelper";
import mongoose from "mongoose";
import { NextRequest } from "next/server";
import { employeeStatusTypes, permissionTypes, roleTypes } from "@/assets/enums/enum";
import { createCompany } from "@/dal/company/companyDAL";
import { createPermission } from "@/dal/permissions/permissionsDAL";
import { createFile } from "@/utils/createFile";
import { formatCompany } from "@/utils/format";
import { uploadImage } from "@/utils/uploadImage";
import companySchema from "@/yup/company/company";
import companyUpdateSchema from "@/yup/company/companyUpdate";

export async function POST(request: NextRequest) {
    const formData = await request.formData();

    try {
        const decodedToken = await verifyUserAuth();

        const company = {
            name: formData?.get("name"),
            email: formData?.get("email"),
            phoneNumber: formData?.get("phoneNumber"),
            website: formData?.get("website"),
            picture: formData?.get("picture"),
            description: formData?.get("description"),
        };

        const validatedCompany = await companySchema.validate(company, { abortEarly: false });

        const formattedCompany = formatCompany(validatedCompany);
        const registerCompany = { ...formattedCompany, userID: decodedToken?.userId };

        const imageBuffers = await createFile(validatedCompany?.picture as File);

        const urls = await uploadImage(imageBuffers);
        registerCompany.picture = urls;

        let { result, error } = await createCompany(registerCompany);

        if (result && !error) {
            const permission = {
                companyID: result?._id,
                branchID: null,
                userID: decodedToken?.userId,
                role: roleTypes.Owner,
                permissions: Object.values(permissionTypes),
            };

            const { result: permResult, error: permError } = await createPermission(permission);
            if (permResult && !permError) {
                return new Response(JSON.stringify({ message: "Company Registered." }), {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                });
            } else {
                return new Response(JSON.stringify({ error: permError }), {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                });
            }
        } else {
            return new Response(JSON.stringify({ error }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }
    } catch (error: any) {
        if (error.message === "Unauthorized") {
            return new Response(JSON.stringify({ error: "Session expired. Please login again!" }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export async function GET(request: NextRequest) {
    const searchParams = request?.nextUrl?.searchParams;
    const page = searchParams.get("page") ?? "1";
    const limit = searchParams.get("limit") ?? "10";
    const companyID = searchParams.get("companyID");

    try {
        const decodedToken = await verifyUserAuth();

        if (companyID) {
            const { permission, error } = await findPermission({
                companyID: companyID,
                userID: decodedToken?.userId,
            });

            if (!permission || error || permission.status !== employeeStatusTypes.Active) {
                return new Response(
                    JSON.stringify({
                        error: error || "Access denied.",
                    }),
                    {
                        status: 403,
                        headers: { "Content-Type": "application/json" },
                    },
                );
            }

            if (permission?.branchID) {
                return new Response(JSON.stringify({ error: "Access denied." }), {
                    status: 403,
                    headers: { "Content-Type": "application/json" },
                });
            }

            const { company, error: companyError } = await findCompanyByID(companyID);
            if (!company || companyError) {
                return new Response(
                    JSON.stringify({ error: companyError ?? "Company not found." }),
                    {
                        status: 400,
                        headers: { "Content-Type": "application/json" },
                    },
                );
            }
            return new Response(JSON.stringify({ company }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }

        let { permission, error } = await findUserCompanies(
            {
                userID: new mongoose.Types.ObjectId(decodedToken?.userId),
                status: employeeStatusTypes.Active,
            },
            parseInt(page),
            parseInt(limit),
        );

        if (!permission || error) {
            return new Response(
                JSON.stringify({
                    error: error || "You do not have permission to perform this action.",
                }),
                {
                    status: 403,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        return new Response(JSON.stringify({ permission }), {
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
        return new Response(JSON.stringify({ error }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export async function PUT(request: NextRequest) {
    const searchParams = request?.nextUrl?.searchParams;
    const companyID = searchParams.get("companyID");

    const formData = await request.formData();

    try {
        const decodedToken = await verifyUserAuth();

        if (!companyID) {
            return new Response(JSON.stringify({ error: "Missing company ID." }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const company = {
            name: formData?.get("name"),
            email: formData?.get("email"),
            phoneNumber: formData?.get("phoneNumber"),
            website: formData?.get("website"),
            picture: formData?.get("picture"),
            description: formData?.get("description"),
        };

        const validatedCompany = await companyUpdateSchema.validate(company, { abortEarly: false });

        const { permission, error: errorPerm } = await findPermission({
            userID: new mongoose.Types.ObjectId(decodedToken?.userId),
            companyID: new mongoose.Types.ObjectId(companyID),
        });

        if (!permission || errorPerm || permission?.branchID) {
            return new Response(
                JSON.stringify({
                    error: errorPerm || "Access denied.",
                }),
                {
                    status: 403,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        const formattedCompany = formatCompany(validatedCompany);

        Object.keys(formattedCompany).forEach((key) => {
            if (!formattedCompany[key]) delete formattedCompany[key];
        });

        if (formattedCompany?.picture) {
            const imageBuffers = await createFile(validatedCompany?.picture as File);
            const urls = await uploadImage(imageBuffers);
            formattedCompany.picture = urls;
        }

        let { result, error } = await updateCompany(companyID, formattedCompany);

        if (!result || error) {
            return new Response(JSON.stringify({ error }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }
        return new Response(JSON.stringify({ message: "Company updated." }), {
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
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
}
