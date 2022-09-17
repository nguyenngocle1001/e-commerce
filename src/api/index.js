import axiosClient from "./axiosClient";

export const GET = ({ url, params }) =>
  axiosClient.get(url, {
    params,
  });

export const POST = ({ url, body = {}, params = {} }) =>
  axiosClient.post(url, body, {
    params,
  });

export const DELETE = ({ url, params }) =>
  axiosClient.delete(url, {
    params,
  });
