import mongoose from "mongoose";

require("@/models/ordersCount");
const orderCountSchema = mongoose.model("orderscount");

export const findOrderCountByID = async (id?: string) => {
    let orderCount,
        error = null;
    try {
        orderCount = await orderCountSchema.findById(id).lean();
    } catch (e: any) {
        error = e.message;
    } finally {
        return { orderCount, error };
    }
};

export const findOrderCount = async (query: object) => {
    let orderCount,
        error = null;
    try {
        orderCount = await orderCountSchema.findOne(query).lean();
    } catch (e: any) {
        error = e.message;
    } finally {
        return { orderCount, error };
    }
};

export const findOrderCounts = async (query: object) => {
    let orderCounts,
        error = null;
    try {
        orderCounts = await orderCountSchema.find(query).lean();
    } catch (e: any) {
        error = e.message;
    } finally {
        return { orderCounts, error };
    }
};

export const createOrderCount = async (order: object) => {
    let result,
        error = null;
    try {
        result = await orderCountSchema.create(order);
    } catch (e: any) {
        error = e.message;
    } finally {
        return { result, error };
    }
};

export const updateOrderCount = async (
    query: object | object,
    update: object,
    filter: object = {},
) => {
    let result,
        error = null;
    try {
        const orderUp = await orderCountSchema.findOneAndUpdate(query, update, filter);
        result = orderUp !== null;
    } catch (e: any) {
        error = e.message;
    } finally {
        return { result, error };
    }
};
