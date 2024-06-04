import { AxiosResponse } from "../types/AxiosResponse";
import { KnowledgeBase } from "../types/KnowledgeBase";
import { baseApi } from "./baseApi";

export const getKnowledgeBaseStatus = async () => {
  return baseApi.get<AxiosResponse>("/knowledge-base/status");
};

export const uploadKnowledgeBase = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return baseApi.post<AxiosResponse>("/knowledge-base/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getKnowledgeBase = async () => {
  return baseApi.get<AxiosResponse<KnowledgeBase>>("/knowledge-base");
};

export const findParameters = async (ids: string[]) => {
  return baseApi.post<AxiosResponse<KnowledgeBase>>(
    "/knowledge-base/find",
    ids
  );
};
