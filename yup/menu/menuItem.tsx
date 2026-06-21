import * as yup from "yup";

const menuItemSchema = yup.object().shape({
    _id: yup.string().optional(),
    branchID: yup.string().required("Branch ID is required."),
    name: yup.string().required("Name is required."),
    price: yup.number().typeError("Price must be a number.").required("Price is required."),
    ingredients: yup.string().optional(),
    category: yup.array().of(yup.string().required()).min(1, "Select at least one category."),
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
    discount: yup.number().optional(),
    discountStart: yup.date().nullable().optional(),
    discountEnd: yup.date().nullable().optional(),
    rating: yup.number(),
    totalRatings: yup.number(),
});

export default menuItemSchema;
