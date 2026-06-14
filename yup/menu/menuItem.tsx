import * as yup from "yup";

const menuItemSchema = yup.object().shape({
    branchID: yup.string(),
    name: yup.string().required("Name is required."),
    price: yup.string().required("Price is required."),
    ingredients: yup.string(),
    category: yup.array().of(yup.string()).min(1, "Select at least one"),
    picture: yup.mixed()
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

export default menuItemSchema;
