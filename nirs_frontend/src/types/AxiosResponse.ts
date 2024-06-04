export type AxiosResponse<T = null> = {
  status: "success" | "error";
  result?: T;
  message?: string;
};
