import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const casinoOddsApi =
  import.meta.env.VITE_CASINO_ODDS_API || import.meta.env.VITE_ODDS_API;

export const casinoData = createApi({
  reducerPath: "casinoData",
  baseQuery: fetchBaseQuery({
    baseUrl: casinoOddsApi,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    casinoResult: build.query({
      query: (arg) => ({
        url: `/betfair_api/casino/result/meta-${arg}`,
        method: "GET",
      }),
    }),
    getCasinoResyltByRoundId: build.mutation({
      query: (arg) => ({
        url: `/betfair_api/casino/result-round-id-wise/${arg}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCasinoResultQuery,
  useGetCasinoResyltByRoundIdMutation,
} = casinoData;
