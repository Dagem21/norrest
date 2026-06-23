import * as yup from "yup";

const employeeSchema = yup.object().shape(
    {
        companyID: yup.string().required("Company ID is required."),
        branchID: yup.string(),
        userID: yup.string(),
        email: yup
            .string()
            .email("Enter a valid email address.")
            .when("phoneNumber", {
                is: (val: any) => !val || val.length === 0,
                then: (schema) => schema.required("Either Email or Phone Number is required."),
                otherwise: (schema) => schema.notRequired(),
            }),
        phoneNumber: yup
            .string()
            .nullable()
            .transform((value) => (value === "" ? null : value))
            .matches(/^[79]\d{8}$/, {
                message: "Enter a valid phone number.",
                excludeEmptyString: true,
            })
            .when("email", {
                is: (val: any) => !val || val.length === 0,
                then: (schema) => schema.required("Either Email or Phone Number is required."),
                otherwise: (schema) => schema.notRequired(),
            }),
        role: yup.string().required("Role is required."),
        permissions: yup.array().of(yup.string()).min(1, "Select at least one"),
    },
    [["email", "phoneNumber"]],
);

export default employeeSchema;
