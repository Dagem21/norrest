import * as yup from "yup";

const companySchema = yup.object().shape({
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
    website: yup.string(),
    picture: yup
        .mixed()
        .required("Document is required.")
        .test("fileSize", "Please choose a file with size less than 10MB.", (value) => {
            if (!value) return false;

            let file: any = value;

            if (typeof window !== "undefined" && value instanceof FileList) {
                file = value[0];
            } else if (Array.isArray(value)) {
                file = value[0];
            }

            if (!file || typeof file.size !== "number") return false;
            return file.size <= 10 * 1024 * 1024; // 10MB
        }),
});

export default companySchema;
