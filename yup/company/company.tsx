import * as yup from "yup";

const companySchema = yup.object().shape({
    companyID: yup.string(),
    name: yup.string().required("Name is required."),
    email: yup.string().required("Email is required."),
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
            if (!value) return true;
            const fileArray =
                value instanceof FileList ? Array.from(value) : ([] as any[]).concat(value);

            return fileArray.every((file: any) => {
                return file && typeof file.size === "number" && file.size <= 10 * 1024 * 1024;
            });
        }),
});

export default companySchema;
