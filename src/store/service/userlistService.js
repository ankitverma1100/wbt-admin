import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { dynamicBaseQuery } from "./dynamicBaseQuery";

export const userlistApi = createApi({
  reducerPath: "userlistApi",
  baseQuery: dynamicBaseQuery,
  tagTypes: ["dashboard"],
  endpoints: (build) => ({
    userList: build.mutation({
      query: (body) => ({
        url: "/user/child-list-active-user",
        method: "POST",
        body,
      }),
    }),
    odsPnl: build.query({
      query: (body) => ({
        url: "/bets/odds-pnl",
        method: "POST",
        body,
      }),
    }),
    deposit: build.mutation({
      query: (body) => ({
        url: "/bmx/user/deposit-chips-pnl-v2",
        method: "POST",
        body,
      }),
      invalidatesTags: ["dashboard"],
    }),

    withdraw: build.mutation({
      query: (body) => ({
        url: "/bmx/user/withdraw-chips-pnl-v2",
        method: "POST",
        body,
      }),
      invalidatesTags: ["dashboard"],
    }),

    depositAndWithdraw: build.query({
      query: (body) => ({
        url: "/bmx/user/depositwithdrawdata-v2",
        method: "POST",
        body,
      }),
      invalidatesTags: ["dashboard"],
    }),
    addLimit: build.mutation({
      query: (body) => ({
        url: "/bmx/user/dcr-v2",
        method: "POST",
        body,
      }),
      invalidatesTags: ["dashboard"],
    }),
    minusLimit: build.mutation({
      query: (body) => ({
        url: "/bmx/user/wcr-v2",
        method: "POST",
        body,
      }),
      invalidatesTags: ["dashboard"],
    }),
    partnership: build.mutation({
      query: (body) => ({
        url: "/user/user-parent-share",
        method: "POST",
        body,
      }),
    }),
    createUserData: build.query({
      query: (body) => ({
        url: "/bmx/user/get-user-data-for-create-user",
        method: "POST",
        body,
      }),
      invalidatesTags: ["dashboard"],
    }),
    createUser: build.mutation({
      query: (body) => ({
        url: "/bmx/user/create/v2",
        method: "POST",
        body,
      }),
      invalidatesTags: ["dashboard"],
    }),
    updateUser: build.mutation({
      query: (body) => ({
        url: "/user/update-detail",
        method: "POST",
        body,
      }),
      invalidatesTags: ["dashboard"],
    }),
    getUser: build.query({
      query: (body) => ({
        url: "/user/user-detail-for-edit",
        method: "POST",
        body,
      }),
      invalidatesTags: ["dashboard"],
    }),
    accountOpration: build.query({
      query: (body) => ({
        url: "/ant-pro/get-accstt-chpdtl",
        method: "POST",
        body,
      }),
    }),
    isUserId: build.query({
      query: (body) => ({
        url: "/user/is-userid-available",
        method: "POST",
        body,
      }),
    }),
    upDateLimites: build.query({
      query: (body) => ({
        url: "/bmx/user/creditdata-v2",
        method: "POST",
        body,
      }),
    }),
    dashboard: build.query({
      query: () => ({
        url: "/user/ant-dashboard",
        method: "POST",
      }),
      providesTags: ["dashboard"],
    }),
    getUserId: build.mutation({
      query: (body) => ({
        url: "/bmx/user/get-ordered-user-id",
        method: "POST",
        body,
      }),
      providesTags: ["dashboard"],
    }),
    getMyLedger: build.query({
      query: (body) => ({
        url: "/ledger/my-ledger",
        method: "POST",
        body,
      }),
    }),
    getGenerate: build.mutation({
      query: (body) => ({
        url: "/ant-pro/generate-password-ant-pro",
        method: "POST",
        body,
      }),
    }),
    getUpdatePassword: build.mutation({
      query: (body) => ({
        url: "/ant-pro/update-password",
        method: "POST",
        body,
      }),
    }),
    accOpration: build.query({
      query: (body) => ({
        url: "/ant-pro/get-account-operations",
        method: "POST",
        body,
      }),
    }),
    appDetails: build.query({
      query: (body) => ({
        url: "/app-detail/app-detail-all",
        method: "POST",
        body,
      }),
    }),
    appDetailsAllowedForChange: build.query({
      query: () => ({
        url: "/user/app-detail-allowed-forchange",
        method: "POST",
      }),
    }),
    selfDeposit: build.mutation({
      query: (body) => ({
        url: "/superadmin/self-deposit",
        method: "POST",
        body,
      }),
      invalidatesTags: ["dashboard"],
    }),
    getCasinoLability: build.query({
      query: (body) => ({
        url: `/casino/liability`,
        method: "POST",
        body,
      }),
    }),
    getMatchListLeder: build.query({
      query: (body) => ({
        url: `/sports/match-list-postledger-androllback`,
        method: "POST",
        body,
      }),
    }),
    getPostLeder: build.mutation({
      query: (body) => ({
        url: `/ledger/post-ledger`,
        method: "POST",
        body,
      }),
    }),
    getRollBack: build.mutation({
      query: (body) => ({
        url: `/ledger/rollback-ledger`,
        method: "POST",
        body,
      }),
    }),
    getCreateApp: build.mutation({
      query: (body) => ({
        url: `/app-detail/create`,
        method: "POST",
        body,
      }),
    }),
    getUpdateApp: build.mutation({
      query: (body) => ({
        url: `/app-detail/update`,
        method: "POST",
        body,
      }),
    }),
    getEventLockList: build.query({
      query: () => ({
        url: `/sports/active-event-list`,
        method: "POST",
      }),
    }),
    getEventActiveDeactive: build.mutation({
      query: (body) => ({
        url: `/sports/upadte-event-activation`,
        method: "POST",
        body,
      }),
    }),
    getCompletdMatches: build.query({
      query: (body) => ({
        url: `/report/get-active-bets-of-completed-matches`,
        method: "POST",
        body,
      }),
    }),
    getDeletedMatches: build.query({
      query: (body) => ({
        url: `/sports/event-ledger-not-posted`,
        method: "POST",
        body,
      }),
    }),
    getDeletedBetByTime: build.mutation({
      query: (body) => ({
        url: `/superadmin/delete-bet-bytime`,
        method: "POST",
        body,
      }),
    }),

    getSessionBetDeleted: build.query({
      query: (body) => ({
        url: `/report/get-session-bets-to-delete`,
        method: "POST",
        body,
      }),
    }),
    getMatchedBetDeleted: build.query({
      query: (body) => ({
        url: `/report/get-match-bets-to-delete`,
        method: "POST",
        body,
      }),
    }),
    getDeletdBet: build.mutation({
      query: (body) => ({
        url: `/superadmin/delete-bet-byid`,
        method: "POST",
        body,
      }),
    }),
    setMessage: build.mutation({
      query: (body) => ({
        url: `/message/set-message`,
        method: "POST",
        body,
      }),
    }),
    getMessage: build.query({
      query: () => ({
        url: `/message/get-message`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  // useUserListQuery,
  useOdsPnlQuery,
  useDepositMutation,
  useWithdrawMutation,
  useDepositAndWithdrawQuery,
  useAddLimitMutation,
  useMinusLimitMutation,
  usePartnershipMutation,
  useLazyCreateUserDataQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useGetUserQuery,
  useAccountOprationQuery,
  useDashboardQuery,
  useLazyIsUserIdQuery,
  useLazyUpDateLimitesQuery,
  useGetUserIdMutation,
  useGetMyLedgerQuery,
  useGetGenerateMutation,
  useGetUpdatePasswordMutation,
  useAccOprationQuery,
  useAppDetailsQuery,
  useAppDetailsAllowedForChangeQuery,
  useSelfDepositMutation,
  useGetCasinoLabilityQuery,
  useGetMatchListLederQuery,
  useGetPostLederMutation,
  useGetRollBackMutation,
  useGetCreateAppMutation,
  useGetUpdateAppMutation,
  useGetEventLockListQuery,
  useGetEventActiveDeactiveMutation,
  useGetCompletdMatchesQuery,
  useGetDeletedMatchesQuery,
  useGetDeletedBetByTimeMutation,
  useGetSessionBetDeletedQuery,
  useGetDeletdBetMutation,
  useGetMatchedBetDeletedQuery,
  useGetMessageQuery,
  useSetMessageMutation
} = userlistApi;
