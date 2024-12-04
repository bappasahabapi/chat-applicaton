import { apiSlice } from "../api/apiSlice";

const REACT_APP_CONVERSATIONS_PER_PAGE = 5;

export const conversationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversatons: builder.query({
      query: (email) =>
        `/conversations?participants_like{email}&_sort=timestamp&_order=desc&_page=1&_limit=${REACT_APP_CONVERSATIONS_PER_PAGE}`,
    }),
  }),
});


export const {useGetConversatonsQuery}=conversationsApi;