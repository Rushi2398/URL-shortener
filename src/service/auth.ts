import mongoose from "mongoose";

const sesssionIdToUserMap = new Map();

export const setUser = (id: string, user: mongoose.Types.ObjectId) => {
    sesssionIdToUserMap.set(id, user)
}

export const getUser = (id: string) => {
    return sesssionIdToUserMap.get(id);
}