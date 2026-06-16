import * as yup from "yup";
import mongoose from "mongoose";
import userSch from "@/yup/userRegistration/userRegisteration";

require("@/models/user");
const userSchema = mongoose.model("users");

export const findUserByID = async (id?: string) => {
    let user,
        error = null;
    try {
        user = (await userSchema.findById(id).lean()) as yup.InferType<typeof userSch> | null;
    } catch (e) {
        error = e;
    } finally {
        return { user, error };
    }
};

export const findUser = async (query: object) => {
    let user,
        error = null;
    try {
        user = (await userSchema.findOne(query).lean()) as yup.InferType<typeof userSch> | null;
    } catch (e) {
        error = e;
    } finally {
        return { user, error };
    }
};

export const createUser = async (user: object) => {
    let result,
        error = null;
    try {
        result = await userSchema.create(user);
    } catch (e) {
        console.log(e);
        error = e;
    } finally {
        return { result, error };
    }
};

export const updateUser = async (id: mongoose.Schema.Types.ObjectId, update: object) => {
    let result,
        error = null;
    try {
        const userUp = await userSchema.findByIdAndUpdate(id, { $set: update });
        result = userUp.modifiedCount === 1;
    } catch (e) {
        error = e;
    } finally {
        return { result, error };
    }
};
