import * as yup from "yup";
import mongoose from "mongoose";
import orderSch from "@/yup/order/order";

require("@/models/orders");
const orderSchema = mongoose.model("orders");

export const findOrderByID = async (id?: string) => {
    let order,
        error = null;
    try {
        order = (await orderSchema.findById(id).lean()) as yup.InferType<typeof orderSch> | null;
    } catch (e: any) {
        error = e.message;
    } finally {
        return { order, error };
    }
};

export const findOrder = async (query: object) => {
    let order,
        error = null;
    try {
        order = (await orderSchema.findOne(query).lean()) as yup.InferType<typeof orderSch> | null;
    } catch (e: any) {
        error = e.message;
    } finally {
        return { order, error };
    }
};

export const findOrders = async (query: object, page: number = 1, limit: number = 10) => {
    let orders,
        error = null;
    try {
        const order = await orderSchema.find(query)
            .populate({
                path: "userID",
                select: "firstName phoneNumber",
            })
            .populate("items.itemID")
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

        const total = await orderSchema.countDocuments(query);
        const totalPages = Math.ceil((total ?? 0) / limit);
        orders = { orders: order, page, limit, total, totalPages };
    } catch (e: any) {
        error = e.message;
    } finally {
        return { orders, error };
    }
};

export const createOrder = async (order: object) => {
    let result,
        error = null;
    try {
        result = await orderSchema.create(order);
    } catch (e: any) {
        error = e.message;
    } finally {
        return { result, error };
    }
};

export const updateOrder = async (query: object | object, update: object, filter: object = {}) => {
    let result,
        error = null;
    try {
        const orderUp = await orderSchema.findOneAndUpdate(query, update, filter);
        console.log(orderUp);
        result = orderUp !== null;
    } catch (e: any) {
        error = e.message;
    } finally {
        return { result, error };
    }
};

export const deleteOrder = async (id: string) => {
    let result,
        error = null;
    try {
        const orderDe = await orderSchema.findByIdAndDelete(id);
        result = orderDe !== null;
    } catch (e: any) {
        error = e.message;
    } finally {
        return { result, error };
    }
};
