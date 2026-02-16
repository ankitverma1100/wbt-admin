import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { dynamicBaseQuery } from "./dynamicBaseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: dynamicBaseQuery,
  endpoints: (build) => ({
    // login: build.mutation({
    //   query: (body) => ({
    //     url: "/login/cleint-login",
    //     method: "POST",
    //     body,
    //   }),
    // }),
    login: build.mutation({
      query: (body) => ({
        url: "/login/client-login-fotp",
        method: "POST",
        body,
      }),
    }),
    loginDirect: build.mutation({
      query: (body) => ({
        url: "/login/cleint-login",
        method: "POST",
        body,
      }),
    }),
    loginWithOtp: build.mutation({
      query: (body) => ({
        url: "/login/client-login-wotp",
        method: "POST",
        body,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: "/login/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLoginDirectMutation,
  useLogoutMutation,
  useLoginWithOtpMutation,
} = authApi;
