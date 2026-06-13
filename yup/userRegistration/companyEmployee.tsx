import * as yup from "yup";

const employeeSchema = yup.object().shape({
    UserID: yup.string(),
    Email: yup.string().required("Email is required."),
    PhoneNumber: yup
        .string()
        .matches(/^[0-9]+$/, "Enter a valid phone number.")
        .required("Phone number is required.")
        .test("number-length", "Provide a valid Phone Number", (value) => {
            return String(value).length === 9;
        })
        .test("first-digit", "Provide a valid Phone Number", (value) => {
            return String(value).startsWith("9") || String(value).startsWith("7");
        }),
    Role: yup.string().required("Role is required."),
    Permissions: yup.array().of(yup.string()).min(1, "Select at least one"),
});

export default employeeSchema;
