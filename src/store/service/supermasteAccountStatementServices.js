import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { dynamicBaseQuery } from "./dynamicBaseQuery";

export const supermasteAccountStatementApi = createApi({
  reducerPath: "supermasteAccountStatementApi",
  baseQuery: dynamicBaseQuery,
  tagTypes: ["deleteByUser", "superUserList", "casinoList", "dashboard"],
  endpoints: (build) => ({
    accountstatement: build.query({
      query: (body) => ({
        url: "/bmx/report/account-statement",
        method: "POST",
        body,
      }),
    }),
    ProfitLoss: build.query({
      query: (body) => ({
        url: "/report/profit-loss-match-wise",
        method: "POST",
        body,
      }),
    }),
    SearchBetMarketId: build.query({
      query: (body) => ({
        url: "/bets/search-bet-market-and-user",
        method: "POST",
        body,
      }),
    }),
    changePassword: build.mutation({
      query: (body) => ({
        url: "/user/changepassword-self",
        method: "POST",
        body,
      }),
    }),
    changePasswordSelf: build.mutation({
      query: (body) => ({
        url: "/user/first-login-cp",
        method: "POST",
        body,
      }),
    }),

    completeFancy: build.query({
      query: (body) => ({
        url: "/bmx/completed-fancy",
        method: "POST",
        body,
      }),
    }),
    complteFancyOddsClients: build.query({
      query: (body) => ({
        url: "/bmx/report/completed-fancy-odds-clients",
        method: "POST",
        body,
      }),
    }),
    filterbyClient: build.query({
      query: (body) => ({
        url: `/user/username-id-search`,
        method: "POST",
        body,
      }),
      providesTags: ["deleteByUser"],
    }),
    createTransaction: build.mutation({
      query: (body) => ({
        url: `/ledger/get-ledger-cash-trans-userid`,
        method: "POST",
        body,
      }),
    }),
    userList: build.query({
      query: (body) => ({
        url: `/bmx/bmx-user-details-v2`,
        method: "POST",
        body,
      }),
    }),
    DeleteByUserID: build.mutation({
      query: (body) => ({
        url: `/bmx/delete-cash-transection-v2`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["deleteByUser"],
    }),
    fetchDeleteTransection: build.query({
      query: (body) => ({
        url: `/bmx/fetch-deleted-transection`,
        method: "POST",
        body,
      }),
    }),
    ttlBook: build.query({
      query: (body) => ({
        url: `/bmx/ttl-book`,
        method: "POST",
        body,
      }),
    }),

    profitLoss: build.query({
      query: (body) => ({
        url: `/bmx/profit-loss`,
        method: "POST",
        body,
      }),
    }),
    blockBetting: build.mutation({
      query: (body) => ({
        url: "/bmx/user/update-bet-account-status-v2",
        method: "POST",
        body,
      }),
      invalidatesTags: ["superUserList"],
    }),

    userBetLock: build.mutation({
      query: (body) => ({
        url: "/ant-pro/bet-lock",
        method: "POST",
        body,
      }),
      invalidatesTags: ["superUserList"],
    }),

    userCasinoLock: build.mutation({
      query: (body) => ({
        url: "/ant-pro/casino-bet-lock",
        method: "POST",
        body,
      }),
      invalidatesTags: ["superUserList"],
    }),
    userMatkaLock: build.mutation({
      query: (body) => ({
        url: "/ant-pro/matka-bet-lock",
        method: "POST",
        body,
      }),
      invalidatesTags: ["superUserList"],
    }),

    casinoList: build.query({
      query: (body) => ({
        url: `/user/get-casino-bet-lock`,
        method: "POST",
        body,
      }),
      providesTags: ["casinoList"],
    }),
    updateCasinoLock: build.mutation({
      query: (body) => ({
        url: `/user/update-casino-lock`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["casinoList"],
    }),

    dataReport: build.mutation({
      query: (body) => ({
        url: `/bmx/report/bmx-data-reports-v2`,
        method: "POST",
        body,
      }),
    }),
    commReport: build.mutation({
      query: (body) => ({
        url: `/bmx/report/bmx-casino-reports-v2`,
        method: "POST",
        body,
      }),
    }),

    createParentList: build.query({
      query: (body) => ({
        url: `/bmx/bmx-user-details-v2`,
        method: "POST",
        body,
      }),
    }),

    superuserList: build.mutation({
      query: (body) => ({
        url: "/user/list-user-v2",
        method: "POST",
        body,
      }),
      providesTags: ["superUserList"],
    }),

    getCreateUser: build.mutation({
      query: (body) => ({
        url: "/user/create",
        method: "POST",
        body,
      }),
    }),
    getUserDetails: build.query({
      query: (body) => ({
        url: "/user/get-detail-for-user-creation",
        method: "POST",
        body,
      }),
    }),
    userIdForSearch: build.query({
      query: (body) => ({
        url: "/user/username-id-search",
        method: "POST",
        body,
      }),
    }),
    depositAndWithdraw: build.query({
      query: (body) => ({
        url: "/user/update-limit",
        method: "POST",
        body,
      }),
      providesTags: ["superUserList"],
    }),
    childListDetails: build.query({
      query: (body) => ({
        url: "/user/child-list-for-limit",
        method: "POST",
        body,
      }),
    }),
    getLedgerDetails: build.mutation({
      query: (body) => ({
        url: "ledger/get-ledger-cash-trans-userid",
        method: "POST",
        body,
      }),
    }),
    createLedger: build.mutation({
      query: (body) => ({
        url: "/ledger/ledger-dep-wid",
        method: "POST",
        body,
      }),
    }),
    getUserActiveDeactive: build.mutation({
      query: (body) => ({
        url: "/user/activate-deactivate-user",
        method: "POST",
        body,
      }),
    }),
    getChildListLimit: build.mutation({
      query: (body) => ({
        url: "user/child-list-for-limit",
        method: "POST",
        body,
      }),
    }),
   
  }),
});

export const {
  useAccountstatementQuery,
  useLazyProfitLossQuery,
  useLazyAccountstatementQuery,
  useLazySearchBetMarketIdQuery,
  useChangePasswordMutation,
  useLazyCompleteFancyQuery,
  useComplteFancyOddsClientsQuery,
  useLazyFilterbyClientQuery,
  useCreateTransactionMutation,
  useLazyUserListQuery,
  useDeleteByUserIDMutation,
  useFetchDeleteTransectionQuery,
  useLazyTtlBookQuery,
  useProfitLossQuery,
  useBlockBettingMutation,
  useChangePasswordSelfMutation,
  useUserBetLockMutation,
  useCasinoListQuery,
  useUpdateCasinoLockMutation,
  useDataReportMutation,
  useCommReportMutation,
  useLazyCreateParentListQuery,
  useLazyDepositAndWithdrawQuery,
  useSuperuserListMutation,
  useChildListDetailsQuery,
  useUserCasinoLockMutation,
  useUserMatkaLockMutation,
  useGetCreateUserMutation,
  useGetUserDetailsQuery,
  useUserIdForSearchQuery,
  useGetLedgerDetailsMutation,
  useCreateLedgerMutation,
  useGetUserActiveDeactiveMutation,
  useGetChildListLimitMutation,

} = supermasteAccountStatementApi;
