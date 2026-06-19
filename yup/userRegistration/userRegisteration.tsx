import * as yup from "yup";

const userSchema = yup.object().shape({
    _id: yup.string(),
    firstName: yup.string().required("First Name is required."),
    fatherName: yup.string().required("Middle Name is required."),
    lastName: yup.string().required("Last Name is required."),
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
    password: yup.string().required("Password is required."),
    confirmPassword: yup
        .string()
        .test("is-same", "Confimation password does not match.", function (value) {
            const { password } = this.parent;
            return password === value;
        }),
    lastLogin: yup.date(),
});

export default userSchema;
