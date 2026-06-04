import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from "../constant";

export const casinoDetailsApi = createApi({
  reducerPath: "casinoDetailsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    rouletteDetails: build.query({
      query: (body) => ({
        url: `/bmx/report/casino-plus-minus`,
        method: "POST",
        body,
      }),
    }),
    roulettePlusMinus: build.query({
      query: (body) => ({
        url: `/bmx/report/casino-plus-minus-real`,
        method: "POST",
        body,
      }),
    }),
    allGame: build.query({
      query: (body) => ({
        url: `/bmx/report/casino-round-wise-pnl`,
        method: "POST",
        body,
      }),
    }),
    // casinoBetList: build.query({
    //   query: (body) => ({
    //     url: `/bmx/report/casino-round-wise-bet-list`,
    //     method: "POST",
    //     body,
    //   }),
    // }),
    // casinoBetListNew: build.query({
    //   query: (body) => ({
    //     url: `/bmx/report/casino-plus-minus-real-new`,
    //     method: "POST",
    //     body,
    //   }),
    // }),
    setCommission: build.mutation({
      query: (body) => ({
        url: `/commission-set-subadmin/set-commission`,
        method: "POST",
        body,
      }),
    }),
    getCommission: build.mutation({
      query: (body) => ({
        url: `/commission-set-subadmin/get-commission`,
        method: "POST",
        body,
      }),
    }),

    getLiveCasinoList: build.query({
      query: (body) => ({
        url: `/casino/casino-list`,
        method: "POST",
        body,
      }),
    }),
    getCasinoBetList: build.query({
      query: (body) => ({
        url: `/casino/casino-bet-list-admin`,
        method: "POST",
        body,
      }),
    }),
    getCasinoBetListByTable: build.query({
      query: (body) => ({
        url: `/ant-pro/get-casino-bets-by-tableid`,
        method: "POST",
        body,
      }),
    }),
    getCasinoBetByMarket: build.query({
      query: (body) => ({
        url: `/ant-pro/casino-bets-by-marketid`,
        method: "POST",
        body,
      }),
    }),
    getCasinoPnlByDate: build.query({
      query: (body) => ({
        url: `ant-pro/get-casino-pnl-by-date`,
        method: "POST",
        body,
      }),
    }),
    casinoDayWisePl: build.query({
      query: (body) => ({
        url: `casino/get-casino-detail-daywise-plusminus`,
        method: "POST",
        body,
      }),
    }),
    getLedgerPost: build.mutation({
      query: (body) => ({
        url: `casino/post-ledger`,
        method: "POST",
        body,
      }),
    }),
    getTvScoreData: build.query({
      query: (body) => ({
        url: `https://api.antpro999.net/ant-pro/get-tv-url`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useRouletteDetailsQuery,
  useRoulettePlusMinusQuery,
  useAllGameQuery,
  // useCasinoBetListQuery,
  // useCasinoBetListNewQuery,
  useSetCommissionMutation,
  useGetCommissionMutation,
  useGetLiveCasinoListQuery,
  useGetCasinoBetListQuery,
  useGetCasinoBetListByTableQuery,
  useGetCasinoBetByMarketQuery,
  useGetCasinoPnlByDateQuery,
  useCasinoDayWisePlQuery,
  useGetLedgerPostMutation,
  useGetTvScoreDataQuery
} = casinoDetailsApi;
