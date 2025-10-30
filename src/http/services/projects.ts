import { $fetch } from "../fetch";

export const createProjectAPI = async (formData: any): Promise<any> => {
  try {
    const response = await $fetch.post(`/project`, formData);
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