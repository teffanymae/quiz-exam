import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./api.slice";
import { QUIZ_APP_TOKEN } from "../constants/values";

export const appInitialState = {
  quizList: [],
  selectedAnswer: {},
  page: 1,
  total: null,
  totalCorrect: 0,
  isNextPage: false,
  themeMode: "light",
};

export const appSlice = createSlice({
  name: "app",
  initialState: appInitialState,
  reducers: {
    updateApp: (state, { payload }) => ({ ...state, ...payload }),
  },
  extraReducers: () => {},
});

export const { updateApp } = appSlice.actions;
export default appSlice.reducer;

const appApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    GetQuizList: builder.mutation({
      query: () => ({
        url: `/questions?apiKey=${QUIZ_APP_TOKEN}&limit=10`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "X-Api-Key": QUIZ_APP_TOKEN,
        },
      }),
      async onQueryStarted(_id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateApp({ quizList: data, total: data.length }));
        } catch (error) {
          console.error("Failed to fetch quiz list:", error);
        }
      },
    }),
  }),
});

export const { useGetQuizListMutation } = appApiSlice;
