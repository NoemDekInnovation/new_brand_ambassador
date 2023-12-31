import { authAxiosInstance, campaignAuthAxiosInstance } from "../api/axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCurrentEngageTalents = createAsyncThunk(
  "currentengage/fetchEngageCurrentTalents",
  async (
    params: {
      queryParams: { [key: string]: string | number } | null;
      status: boolean;
    },
    { rejectWithValue }
  ) => {
    const { queryParams, status } = params;
    const user = localStorage.getItem("userData");

    try {
      if (user !== null) {
        const parsedUser = JSON.parse(user);

        if (queryParams !== null && queryParams !== undefined) {
          // Build the query string based on the dynamic queryParams object
          const queryString = Object.entries(queryParams)
            .map(([key, value]) => `${key}=${value}`)
            .join("&");

          const response = await authAxiosInstance(
            `/engaged-talents?${queryString}&status=${status}`,
            {
              headers: {
                Authorization: `Bearer ${parsedUser.authKey}`,
              },
            }
          );

          // console.log("myTalents", response?.data?.data?.talent);

          return response?.data?.data?.talent;
        }

        const response = await campaignAuthAxiosInstance(
          `/engaged-talents?status=${status}`,
          {
            headers: {
              Authorization: `Bearer ${parsedUser.authKey}`,
            },
          }
        );

        return response?.data?.data?.talent;
      }
    } catch (error: any) {
      if (error.response) {
        console.error("Response Error:", error.response.data);
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        console.error("Request Error:", error.request);
        return rejectWithValue({
          message:
            "No response received. Please check your network connection.",
        });
      } else {
        console.error("General Error:", error.message);
        return rejectWithValue({
          message: "An unexpected error occurred. Please try again later.",
        });
      }
    }
  }
);

const currentengageSlice = createSlice({
  name: "currentengage",
  initialState: {
    currentTalents: [],
    engageTalents: [],
    status: "idle",
    error: null as unknown,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentEngageTalents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentEngageTalents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentTalents = action.payload;
        state.engageTalents = action.payload;
      })
      .addCase(fetchCurrentEngageTalents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default currentengageSlice.reducer;
