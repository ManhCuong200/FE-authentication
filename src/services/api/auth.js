import api from "./index";

export const register = async (data) => {
    return await api.post("/auth/register", data);
}

export const login = async (data) => {
    return await api.post("/auth/login", data);
}

export const refreshToken = async () => {
    return await api.post("/auth/refresh-token");
}

export const getProfile = async () => {
    return await api.get("/auth/me");
}

export const logout = async () => {
    return await api.post("/auth/logout");
}

export const getUsers = async () => {
  return await api.get("/auth/getUsers");  
};
export const deleteUser = async (id) => {
    return await api.delete(`/auth/deleteUser/${id}`);
}

export const updateUser = async (id, data) => {
    return await api.put(`/auth/updateUser/${id}`, data);
}