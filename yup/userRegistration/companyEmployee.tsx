import * as yup from "yup";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[79]\d{8}$/;

const employeeSchema = yup.object().shape({
    companyID: yup.string().required("Company ID is required."),
    branchID: yup.string(),
    userID: yup.string(),
    emailOrPhone: yup
        .string()
        .required("Email or phone number is required")
        .test("is-email-or-phone", "Must be a valid email or phone number", (value) => {
            return emailRegex.test(value) || phoneRegex.test(value);
        }),
    role: yup.string().required("Role is required."),
    permissions: yup.array().of(yup.string()).min(1, "Select at least one"),
});

export default employeeSchema;
