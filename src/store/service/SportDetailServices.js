import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { dynamicBaseQuery } from "./dynamicBaseQuery";

export const sportDetailsApi = createApi({
  reducerPath: "sportDetailsApi",
  baseQuery: dynamicBaseQuery,
  endpoints: (build) => ({
    sportDetail: build.query({
      query: (body) => ({
        url: "/bmx/report/sport-details",
        method: "POST",
        body,
      }),
    }),
    rejectedBetDetail: build.query({
      query: (body) => ({
        url: "/bmx/rejected-and-cancle-bets",
        method: "POST",
        body,
      }),
    }),
    sessionFancyBetDetail: build.query({
      query: (body) => ({
        url: "/bmx/fancy-fetch-by-match-id",
        method: "POST",
        body,
      }),
    }),
    sportPlusMinus: build.query({
      query: (body) => ({
        url: "/bmx/report/match-and-fancy-plus-minus",
        method: "POST",
        body,
      }),
    }),
    searchUserDownline: build.query({
      query: (args) => {
        const { term } = args;
        return {
          url: `/user/search-user-downline?term=${term}&_type=${term}&q=${term}`,
          method: "POST",
        };
      },
    }),
    getMatchBets: build.mutation({
      query: (body) => {
        return {
          url: `/report/get-match-bets`,
          method: "POST",
          body,
        };
      },
    }),
    getQueryMatchBets: build.query({
      query: (body) => {
        return {
          url: `/report/get-match-bets`,
          method: "POST",
          body,
        };
      },
    }),
    getMatchAndSessionBet: build.mutation({
      query: (body) => {
        return {
          url: `/report/get-match-session-bets`,
          method: "POST",
          body,
        };
      },
    }),
    getUserSeacrh: build.mutation({
      query: (body) => {
        return {
          url: `/user/user-search`,
          method: "POST",
          body,
        };
      },
    }),
    getCompletedSport: build.query({
      query: (body) => {
        return {
          url: `/sports/get-completed-events`,
          method: "POST",
          body,
        };
      },
    }),
    getSessionHavingBet: build.query({
      query: (body) => {
        return {
          url: `/report/session-having-bets`,
          method: "POST",
          body,
        };
      },
    }),
    getSessionBet: build.mutation({
      query: (body) => {
        return {
          url: `/report/get-session-bets`,
          method: "POST",
          body,
        };
      },
    }),
    getSessionQureyBet: build.query({
      query: (body) => {
        return {
          url: `/report/get-session-bets`,
          method: "POST",
          body,
        };
      },
    }),
    getChildListForBets: build.query({
      query: (body) => ({
        url: `/urbbet/get-child-list-for-bets`,
        method: "POST",
        body,
      }),
    }),
    getFancyBook: build.mutation({
      query: (body) => {
        return {
          url: `/enduser/fancy-book`,
          method: "POST",
          body,
        };
      },
    }),
    getCompletedFancy: build.mutation({
      query: (body) => {
        return {
          url: `/report/get-completed-session`,
          method: "POST",
          body,
        };
      },
    }),
    getCompletLedger: build.query({
      query: (body) => {
        return {
          url: `/report/get-complete-ledger-v2`,
          method: "POST",
          body,
        };
      },
    }),
    getSessionPlusMinus: build.query({
      query: (body) => {
        return {
          url: `/report/get-session-plus-minus`,
          method: "POST",
          body,
        };
      },
    }),
    getCompleteLedger: build.query({
      query: (body) => {
        return {
          url: `/report/get-complete-ledger`,
          method: "POST",
          body,
        };
      },
    }),
    casiniPlayerList: build.query({
      query: (body) => {
        return {
          url: `casino/get-casino-player-table-list`,
          method: "POST",
          body,
        };
      },
    }),
    getCasinoLedger: build.query({
      query: (body) => {
        return {
          url: `casino/get-casino-ledger`,
          method: "POST",
          body,
        };
      },
    }),
    matchListActiveBets: build.query({
      query: () => {
        return {
          url: `ant-pro/get-matchlist-having-active-bets`,
          method: "POST",
        };
      },
    }),
    marketHavingBet: build.mutation({
      query: (body) => {
        return {
          url: `ant-pro/get-market-having-bets`,
          method: "POST",
          body,
        };
      },
    }),
    getLedgerAll: build.query({
      query: (body) => {
        return {
          url: `ledger/get-ledger-all-parent`,
          method: "POST",
          body,
        };
      },
    }),
    getBetlistAll: build.mutation({
      query: (body) => {
        return {
          url: `/ant-pro/get-bet-list-by-marketid`,
          method: "POST",
          body,
        };
      },
    }),
    getDeletedBet: build.mutation({
      query: (body) => {
        return {
          url: `/superadmin/delete-bet-byid`,
          method: "POST",
          body,
        };
      },
    }),
    getRejectedBet: build.query({
      query: (body) => {
        return {
          url: `/ant-pro/get-deleted-bet-list`,
          method: "POST",
          body,
        };
      },
    }),
    getSecureCode: build.query({
      query: (body) => {
        return {
          url: `/ant-pro/get-secure-code-report`,
          method: "POST",
          body,
        };
      },
    }),
    getLedgerProfitLoss: build.query({
      query: (body) => {
        return {
          url: `/ant-pro/ledger-profit-loss`,
          method: "POST",
          body,
        };
      },
    }),
    getAccOpration: build.query({
      query: (body) => {
        return {
          url: `/ant-pro/get-account-operations`,
          method: "POST",
          body,
        };
      },
    }),
    getCompletdCasino: build.query({
      query: (body) => {
        return {
          url: `/ant-pro/get-completed-casino-detail`,
          method: "POST",
          body,
        };
      },
    }),
    getCasinoDetailsDemo: build.query({
      query: (body) => {
        return {
          url: `/casino/get-casino-detail-date-casinoid`,
          method: "POST",
          body,
        };
      },
    }),
    getAgentPlusMinus: build.query({
      query: (body) => {
        return {
          url: `/ant-pro/get-agent-plus-minus`,
          method: "POST",
          body,
        };
      },
    }),
    getUserLabilaty: build.query({
      query: (body) => {
        return {
          url: `/ant-pro/get-user-bet-liability`,
          method: "POST",
          body,
        };
      },
    }),
    getFancyBetV: build.mutation({
      query: (body) => {
        return {
          url: `/ant-pro/get-fancybet-v-style`,
          method: "POST",
          body,
        };
      },
    }),
    getBetlistUrbFilter: build.mutation({
      query: (body) => {
        return {
          url: `/urbbet/get-betlist-urb-filter`,
          method: "POST",
          body,
        };
      },
    }),
    getAllSessionBet: build.query({
      query: (body) => {
        return {
          url: `/report/all-session-bets`,
          method: "POST",
          body,
        };
      },
    }),
    getCompletedPlusMinus: build.query({
      query: (body) => {
        return {
          url: `/ant-pro/get-completed-casino-plusminus`,
          method: "POST",
          body,
        };
      },
    }),
    getDeletedTranstion: build.mutation({
      query: (body) => {
        return {
          url: `/ant-pro/delete-transaction`,
          method: "POST",
          body,
        };
      },
    }),
    getCommitionReport: build.mutation({
      query: (body) => {
        return {
          url: `/ant-pro/get-commission-report`,
          method: "POST",
          body,
        };
      },
    }),
    getCommitionReportHostopry: build.mutation({
      query: (body) => {
        return {
          url: `/ant-pro/get-commission-report-history`,
          method: "POST",
          body,
        };
      },
    }),
    getTranstionDeatils: build.query({
      query: (body) => {
        return {
          url: `ant-pro/get-deleted-transaction`,
          method: "POST",
          body,
        };
      },
    }),
    getCommissionClientWise: build.mutation({
      query: (body) => {
        return {
          url: `ant-pro/get-commission-report-clientwise`,
          method: "POST",
          body,
        };
      },
    }),
    getCommissionReset: build.mutation({
      query: (body) => {
        return {
          url: `/ant-pro/reset-commission-report`,
          method: "POST",
          body,
        };
      },
    }),
    getActiveSessionData: build.query({
      query: (body) => {
        return {
          url: `/sports/get-active-fancylist-disp`,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  useSportDetailQuery,
  useRejectedBetDetailQuery,
  useLazySessionFancyBetDetailQuery,
  useSportPlusMinusQuery,
  useLazySearchUserDownlineQuery,
  useGetMatchBetsMutation,
  useGetUserSeacrhMutation,
  useGetMatchAndSessionBetMutation,
  useGetCompletedSportQuery,
  useGetSessionHavingBetQuery,
  useGetSessionBetMutation,
  useGetFancyBookMutation,
  useGetCompletedFancyMutation,
  useGetCompletLedgerQuery,
  useGetSessionPlusMinusQuery,
  useGetCompleteLedgerQuery,
  useCasiniPlayerListQuery,
  useGetCasinoLedgerQuery,
  useMatchListActiveBetsQuery,
  useMarketHavingBetMutation,
  useGetLedgerAllQuery,
  useGetBetlistAllMutation,
  useGetDeletedBetMutation,
  useGetRejectedBetQuery,
  useLazyGetSecureCodeQuery,
  useGetLedgerProfitLossQuery,
  useGetAccOprationQuery,
  useGetCompletdCasinoQuery,
  useGetCasinoDetailsDemoQuery,
  useGetAgentPlusMinusQuery,
  useLazyGetUserLabilatyQuery,
  useGetFancyBetVMutation,
  useGetBetlistUrbFilterMutation,
  useGetAllSessionBetQuery,
  useGetCompletedPlusMinusQuery,
  useGetDeletedTranstionMutation,
  useGetCommitionReportMutation,
  useGetTranstionDeatilsQuery,
  useGetCommissionClientWiseMutation,
  useGetCommitionReportHostopryMutation,
  useGetCommissionResetMutation,
  useGetQueryMatchBetsQuery,
  useGetSessionQureyBetQuery,
  useGetActiveSessionDataQuery,
  useGetChildListForBetsQuery
} = sportDetailsApi;
