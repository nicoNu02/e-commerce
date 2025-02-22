import axios from "axios";
export const baseURL = `${process.env.NEXT_PUBLIC_URL}api/auth`;

export const apiService = axios.create({
  baseURL,
});
