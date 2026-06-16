import * as yup from "yup";

const branchSchema = yup.object().shape({
    companyID: yup.string(),
    name: yup.string().required("Name is required."),
    email: yup.string(),
    phoneNumber: yup
        .string()
        .matches(/^[0-9]+$/, "Enter a valid phone number.")
        .required("Phone number is required.")
        .test("number-length", "Provide a valid Phone Number", (value) => {
            return String(value).length === 9;
        })
        .test("first-digit", "Provide a valid Phone Number", (value) => {
            return String(value).startsWith("9") || String(value).startsWith("7");
        }),
    address: yup.string().required("Address is required."),
});

export default branchSchema;
