import * as yup from "yup";

const ratingSchema = yup.object().shape({
    userID: yup.string(),
    menuID: yup.string(),
    rating: yup.number().required("Rating is required."),
    comment: yup.string(),
});

export default ratingSchema;
