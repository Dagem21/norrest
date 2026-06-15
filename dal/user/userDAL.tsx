import mongoose from "mongoose";

require("@/models/user");
const userSchema = mongoose.model("Users");

export const findUser = async (query: object) => {
    let user,
        error = null;
    try {
        user = await UserSchema.findOne(query);
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
