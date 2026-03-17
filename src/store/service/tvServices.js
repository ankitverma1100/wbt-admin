import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const tvApi = createApi({
  reducerPath: "tvApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL_TV || import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getChIds: build.query({
      query: (body) => ({
        url: `sports/channel-id-matchidwise`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetChIdsQuery } = tvApi;
