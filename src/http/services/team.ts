import { ArtistResponse, DepartmentCreateResponse, DepartmentResponse } from "@/lib/interfaces/Team";
import { $fetch } from "../fetch";


export const getAllDepartmentsAPI = async () => {
  try {
    const response = await $fetch.get(`/department`);
    return response as { data: DepartmentResponse };
  } catch (error) {
    throw error;
  }
};

export const createDepartmentAPI = async (name: string) => {
  try {
    const response = await $fetch.post(`/department`, { name });
    return response as { data: DepartmentCreateResponse };
  } catch (error) {
    throw error;
  }
};


export const createUserAPI = async (formData: any): Promise<ArtistResponse> => {
  try {
    const response = await $fetch.post(`/user`, formData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllUsersAPI = async (query = "") => {
  try {
    const response = await $fetch.get(`/user?${query}`);
    return response;
  } catch (error) {
    throw error;
  }
};


export const getUserProjectsAPI = async (query = "") => {
  try {
    const response = await $fetch.get(`/project?${query}`);
    return response;
  } catch (error) {
    throw error;
  }
};