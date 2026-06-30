import * as yup from "yup";

const companyUpdateSchema = yup.object().shape({
    _id: yup.string(),
    name: yup.string(),
    email: yup.string(),
    phoneNumber: yup
        .string()
        .nullable()
        .notRequired()
        .transform((value) => (value === "" ? null : value))
        .matches(/^[0-9]+$/, {
            message: "Enter a valid phone number.",
            excludeEmptyString: true,
        })
        .test("number-length", "Provide a valid Phone Number", (value) => {
            if (!value) return true;
            return value.length === 9;
        })
        .test("first-digit", "Provide a valid Phone Number", (value) => {
            if (!value) return true;
            return value.startsWith("9") || value.startsWith("7");
        }),
    website: yup.string(),
    picture: yup
        .mixed()
        .nullable()
        .optional()
        .test("fileSize", "Please choose a file with size less than 10MB.", (value) => {
            if (!value) return true;

            let file: any = value;

            if (typeof window !== "undefined" && value instanceof FileList) {
                if (value.length === 0) return true;
                file = value[0];
            } else if (Array.isArray(value)) {
                if (value.length === 0) return true;
                file = value[0];
            }

            if (!file || typeof file.size !== "number") return false;

            return file.size <= 10 * 1024 * 1024; // 10MB
        }),
});

export default companyUpdateSchema;
