import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from "../constant";

export const oddsPnlApi = createApi({
  reducerPath: "oddsPnlApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    oddsQuPnl: build.query({
      query: (body) => ({
        url: "/report/odds-pnl-full",
        method: "POST",
        body,
      }),
    }),
    oddsQuPnlMy: build.query({
      query: (body) => ({
        url: "/report/odds-pnl",
        method: "POST",
        body,
      }),
    }),

    fancyPnl: build.query({
      query: (body) => ({
        url: "/bets/fancy-pnl",
        method: "POST",
        body,
      }),
    }),
    WinnerPnl: build.mutation({
      query: (body) => ({
        url: `/bets/winner-pnl`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useOddsQuPnlQuery,
  useLazyOddsQuPnlQuery,
  useOddsQuPnlMyQuery,
  useFancyPnlQuery,
  useWinnerPnlMutation,
  useLazyOddsQuPnlMyQuery,
} = oddsPnlApi;
