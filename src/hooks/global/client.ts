/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
import axios from "axios";
import { enqueueSnackbar } from "notistack";

import { ErrorTypes } from "./type";







export const client = axios.create({
  
  timeoutErrorMessage: "TIMEOUT_ERROR",
  timeout: 60000,
});

client.interceptors.request.use(

  function (error) {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
   return error
  }
);

export type ApiResponseType =
  | "arraybuffer"
  | "blob"
  | "document"
  | "json"
  | "text"
  | "stream";

export interface ApiConfig {
  baseURL?: string;
  responseType?: ApiResponseType;
  headers: any;
}

export interface RequestProps {
  url: string;
  payload?: any;
  config?: ApiConfig;
}

export const getRequest = async ({ url, config }: RequestProps) => {
  return client.get(url, config);
};

export const postRequest = async ({ url, config, payload }: RequestProps) => {
  return client.post(url, payload, config);
};

export const putRequest = async ({ url, config, payload }: RequestProps) => {
  return client.put(url, payload, config);
};

export const patchRequest = async ({ url, config, payload }: RequestProps) => {
  return client.patch(url, payload, config);
};

export const deleteRequest = async ({ url, config }: RequestProps) => {
  return client.delete(url, config);
};

const api = {
  get: getRequest,
  post: postRequest,
  put: putRequest,
  patch: patchRequest,
  delete: deleteRequest,
};

export default api;
