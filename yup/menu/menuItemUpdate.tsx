import * as yup from "yup";

const menuItemUpdateSchema = yup.object().shape({
    _id: yup.string().required("Order ID is required."),
    branchID: yup.string(),
    name: yup.string(),
    price: yup.number(),
    ingredients: yup.string().optional(),
    category: yup.array().of(yup.string()),
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
    discount: yup.number().optional(),
    discountStart: yup.date().nullable().optional(),
    discountEnd: yup.date().nullable().optional(),
    rating: yup.number(),
    totalRatings: yup.number(),
});

export default menuItemUpdateSchema;
