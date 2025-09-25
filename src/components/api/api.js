import axios from "axios";
const key = import.meta.env.VITE_API_ACCESS;

const baseApi = axios.create({
  baseURL: "https://api.unsplash.com/search/photos",
});

export const fetchUnsplash = async (nextPage,queryToUse) => {
  try {
    const endUrl = `?page=${nextPage}&per_page=30&query=${queryToUse}&client_id=${key}`;
    const res = await baseApi.get(`${endUrl}`);
    return res.data.results;
  } catch (error) {
    console.log(error);
  }
};
