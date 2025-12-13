import api from "./index";

export const createProject = async (data) => {
    return await api.post("/project", data);
}

export const getProjects = async () => {
    return await api.get("/project");
}

export const updateProject = async (id, data) => {
    return await api.put(`/project/${id}`, data);
}

export const deleteProject = async (id) => {
    return await api.delete(`/project/${id}`);
}
