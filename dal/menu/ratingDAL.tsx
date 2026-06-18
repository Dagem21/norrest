import mongoose from "mongoose";

require("@/models/ratings");
const ratingSchema = mongoose.model("ratings");

export const findRatingByID = async (id?: string) => {
    let rating,
        error = null;
    try {
        rating = await ratingSchema.findById(id).lean();
    } catch (e: any) {
        error = e.message;
    } finally {
        return { rating, error };
    }
};

export const findRating = async (query: object) => {
    let rating,
        error = null;
    try {
        rating = await ratingSchema.findOne(query).lean();
    } catch (e: any) {
        error = e.message;
    } finally {
        return { rating, error };
    }
};

export const findRatings = async (query: object) => {
    let ratings,
        error = null;
    try {
        ratings = await ratingSchema.aggregate([
            {
                $match: query,
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userID",
                    foreignField: "_id",
                    pipeline: [{ $project: { firstName: 1, _id: 0 } }],
                    as: "user",
                },
            },
            {
                $unwind: "$user",
            },
            { $unset: "user.password" },
        ]);
    } catch (e: any) {
        error = e.message;
    } finally {
        return { ratings, error };
    }
};

export const createUpdateRating = async (query: object, rating: object) => {
    let result,
        error = null;
    try {
        result = await ratingSchema.findOneAndUpdate(query, rating, {
            upsert: true,
            runValidators: true,
        });
    } catch (e: any) {
        error = e.message;
    } finally {
        return { result, error };
    }
};
