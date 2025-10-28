import { Login, LoginResponse, SignupResponse } from "@/lib/interfaces/Auth";
import { $fetch } from "../fetch";

export const userLoginApi = async ({email, password}: {email: string | null, password: string | null}): Promise<LoginResponse> => {
  try {
    const response = await $fetch.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error; 
  }
};


export const userSignupApi = async ({full_name, email, phone, password}: {full_name: string, email: string, phone: string, password: string}): Promise<SignupResponse> => {
  try {
    const response = await $fetch.post("/auth", {
      full_name,
      email,
      phone,
      password,
    });
    return response.data;
  } catch (error) {
    throw error; 
  }
};