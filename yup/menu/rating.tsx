import * as yup from "yup";

const ratingSchema = yup.object().shape({
    userID: yup.string(),
    branchID: yup.string(),
    rating: yup
        .number()
        .required("Rating is required.")
        .min(1, "Rating must be at least 1 star")
        .max(5, "Rating cannot exceed 5 stars"),
    comment: yup.string(),
});

export default ratingSchema;
