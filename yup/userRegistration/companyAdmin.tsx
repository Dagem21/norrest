import * as yup from 'yup';

const adminUserSchema = yup.object().shape({
    UserID: yup.string(),
    FirstName: yup.string().required('First Name is required.'),
    FatherName: yup.string().required('Middle Name is required.'),
    LastName: yup.string().required('Last Name is required.'),
    Email: yup.string().required('Email is required.'),
    PhoneNumber: yup.string()
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
    Password: yup.string()
        .required('Password is required.'),
    ConfirmPassword: yup.string()
        .test('is-same', 'Confimation password does not match.', function (value) {
            const { Password } = this.parent
            return Password === value
        }),
    RoleID: yup.string(),
    Permissions: yup.array(),
});

export default adminUserSchema;