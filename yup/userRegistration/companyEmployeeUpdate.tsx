import * as yup from "yup";

const updateEmployeeSchema = yup.object().shape({
    _id: yup.string(),
    branchID: yup.string(),
    role: yup.string(),
    permissions: yup.array().of(yup.string()),
    status: yup.string(),
});

export default updateEmployeeSchema;
