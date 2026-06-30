import * as yup from "yup";

const profileUpdateSchema = yup.object().shape({
    _id: yup.string(),
    firstName: yup.string(),
    fatherName: yup.string(),
    lastName: yup.string(),
    email: yup.string().email("Enter a valid email address."),
    phoneNumber: yup
        .string()
        .nullable()
        .notRequired()
        .transform((value) => (value === "" ? null : value))
        .matches(/^[0-9]+$/, {
            message: "Enter a valid phone number.",
            excludeEmptyString: true
        })
        .test("number-length", "Provide a valid Phone Number", (value) => {
            if (!value) return true;
            return value.length === 9;
        })
        .test("first-digit", "Provide a valid Phone Number", (value) => {
            if (!value) return true;
            return value.startsWith("9") || value.startsWith("7");
        }),
    userType: yup.string(),
    status: yup.string(),
    lastLogin: yup.date(),
});

export default profileUpdateSchema;
