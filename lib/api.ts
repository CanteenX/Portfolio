import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: API_URL,
});

// Fetcher for SWR
export const fetcher = (url: string) => api.get(url).then((res) => res.data);
