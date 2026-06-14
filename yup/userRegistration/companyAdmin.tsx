import * as yup from 'yup';

const adminUserSchema = yup.object().shape({
    userID: yup.string(),
    firstName: yup.string().required('First Name is required.'),
    fatherName: yup.string().required('Middle Name is required.'),
    lastName: yup.string().required('Last Name is required.'),
    email: yup.string().required('Email is required.'),
    phoneNumber: yup.string()
        .matches(/^[0-9]+$/, "Enter a valid phone number.")
        .required('Phone number is required.')
        .test(
            'number-length',
            'Provide a valid Phone Number',
            (value) => { return String(value).length === 9 },
        )
        .test(
            'first-digit',
            'Provide a valid Phone Number',
            (value) => { return String(value).startsWith('9') || String(value).startsWith('7') },
        ),
    password: yup.string()
        .required('Password is required.'),
    confirmPassword: yup.string()
        .test('is-same', 'Confimation password does not match.', function (value) {
            const { Password } = this.parent
            return Password === value
        }),
    role: yup.string(),
    permissions: yup.array(),
});

export default adminUserSchema;