import * as yup from "yup";

const orderSchema = yup.object().shape({
    _id: yup.string().optional(),
    userID: yup.string(),
    branchID: yup.string().required("Branch ID is required."),
    items: yup.array().of(
        yup.object().shape({
            userID: yup.string(),
            itemID: yup.string().required("Item ID is required."),
            quantity: yup.number().min(1, "Minimum orders is 1."),
        }),
    ),
    table: yup.number(),
    status: yup.string(),
    waiterID: yup.string(),
});

export default orderSchema;
