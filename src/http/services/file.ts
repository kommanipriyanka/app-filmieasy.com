import { fi } from "date-fns/locale";
import { $fetch } from "../fetch";

export const getS3UploadUrl = async (s3Payload: any) => {
  try {
    const response = await $fetch.post(
      "/file/signed-url",
      s3Payload,
      { "x-api-key": `${import.meta.env.VITE_PUBLIC_API_KEY}` }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const uploadToPresignedUrl = async (url: string, file: any) => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      body: file,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getFileAPI = async (key: string) => {
  try {
    const response = await $fetch.post("/file/download", { key });
    return response;
  } catch (error) {
    throw error;
  }
};

