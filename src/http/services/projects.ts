import { $fetch } from "../fetch";

export const createProjectAPI = async (formData: any): Promise<any> => {
  try {
    const response = await $fetch.post(`/project/create`, formData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllProjectsAPI = async (query = "") => {
  try {
    const response = await $fetch.get(`/project?${query}`);
    return response;
  } catch (error) {
    throw error;
  }
}

export const getProjectAPI = async (projectId: string) => {
  try {
    const response = await $fetch.get(`/project/${projectId}`);
    return response;
  } catch (error) {
    throw error;
  }
}

export const getProjectUsersAPI = async (projectId: string) => {
  try {
    const response = await $fetch.get(`/project/${projectId}/users`);
    return response;
  } catch (error) {
    throw error;
  }
}