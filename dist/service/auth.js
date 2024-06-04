const sesssionIdToUserMap = new Map();
export const setUser = (id, user) => {
    sesssionIdToUserMap.set(id, user);
};
export const getUser = (id) => {
    return sesssionIdToUserMap.get(id);
};
