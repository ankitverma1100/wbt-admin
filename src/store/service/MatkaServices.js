import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { dynamicBaseQuery } from "./dynamicBaseQuery";

export const matkaApi = createApi({
  reducerPath: "matkaApi",
  baseQuery: dynamicBaseQuery,
  endpoints: (build) => ({
    getMatkaList: build.query({
      query: (body) => ({
        url: "matka/list",
        method: "POST",
        body,
      }),
    }),
    getMatkaMarket: build.query({
      query: (body) => ({
        url: "matka/get-matka-market",
        method: "POST",
        body,
      }),
    }),
    getMatkaBets: build.query({
      query: (body) => ({
        url: "matka/get-matka-bets",
        method: "POST",
        body,
      }),
    }),
    getMatkaLiability: build.query({
      query: (body) => ({
        url: "matka/get-matka-liability",
        method: "POST",
        body,
      }),
    }),
    setMatkaResult: build.mutation({
      query: (body) => ({
        url: "matka/set-matka-result",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetMatkaListQuery,
  useGetMatkaMarketQuery,
  useGetMatkaBetsQuery,
  useGetMatkaLiabilityQuery,
  useSetMatkaResultMutation,
} = matkaApi;
