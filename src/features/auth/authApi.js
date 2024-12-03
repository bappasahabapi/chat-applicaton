import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          //first set the login value to  local storage
          // the dispatch the value to redux store
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );

          //dispatch the value to  the redux store
          // dispatch(
          //   userLoggedIn(
          //     JSON.stringify({
          //       accessToken: result.data.accessToken,
          //       user: result.data.user,
          //     })
          //   )
          // );
          userLoggedIn({
            accessToken: result.data.accessToken,
            user: result.data.user,
          });
        } catch (error) {
          // do nothing
        }
      },
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      //TODO: same kaj ekaneo hbe
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          //first set the login value to  local storage
          // the dispatch the value to redux store
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );

          //dispatch the value to  the redux store
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error) {}
      },
     
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
