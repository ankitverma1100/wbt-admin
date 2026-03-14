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
    getMatkaBetBySid: build.mutation({
      async queryFn(body, api, extraOptions, baseQuery) {
        const primaryResult = await baseQuery({
          url: "matka/get-matka-bet-by-sid",
          method: "POST",
          body,
        });

        if (!primaryResult?.error || primaryResult?.error?.status === 401) {
          return primaryResult;
        }

        return baseQuery({
          url: "matka/get-mtk-bet-by-sid",
          method: "POST",
          body,
        });
      },
    }),
  }),
});

export const {
  useGetMatkaListQuery,
  useGetMatkaMarketQuery,
  useGetMatkaBetsQuery,
  useGetMatkaLiabilityQuery,
  useSetMatkaResultMutation,
  useGetMatkaBetBySidMutation,
} = matkaApi;
