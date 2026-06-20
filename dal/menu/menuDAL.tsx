import * as yup from "yup";
import mongoose from "mongoose";
import menuSch from "@/yup/menu/menuItem";

require("@/models/menu");
const menuSchema = mongoose.model("menus");

export const findMenuByID = async (id?: string) => {
    let menu,
        error = null;
    try {
        menu = (await menuSchema.findById(id).lean()) as yup.InferType<typeof menuSch> | null;
    } catch (e: any) {
        error = e.message;
    } finally {
        return { menu, error };
    }
};

export const findMenu = async (query: object) => {
    let menu,
        error = null;
    try {
        menu = (await menuSchema.findOne(query).lean()) as yup.InferType<typeof menuSch> | null;
    } catch (e: any) {
        error = e.message;
    } finally {
        return { menu, error };
    }
};

export const findMenus = async (query: object, page: number = 1, limit: number = 10) => {
    let menus,
        error = null;
    try {
        const items = await menuSchema
            .find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();
        const total = await menuSchema.countDocuments(query);
        const totalPages = Math.ceil((total ?? 0) / limit);
        menus = { items, page, limit, total, totalPages };
    } catch (e: any) {
        error = e.message;
    } finally {
        return { menus, error };
    }
};

export const createMenu = async (menu: object) => {
    let result,
        error = null;
    try {
        result = await menuSchema.create(menu);
    } catch (e: any) {
        error = e.message;
    } finally {
        return { result, error };
    }
};

export const updateMenu = async (id: mongoose.Types.ObjectId, update: object) => {
    let result,
        error = null;
    try {
        const menuUp = await menuSchema.findByIdAndUpdate(id, { $set: update });
        result = menuUp !== null;
    } catch (e: any) {
        error = e.message;
    } finally {
        return { result, error };
    }
};
