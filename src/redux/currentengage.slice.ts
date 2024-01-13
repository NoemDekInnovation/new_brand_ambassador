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

          return response?.data?.data;
        }

        const response = await campaignAuthAxiosInstance(
          `/engaged-talents?status=${status}`,
          {
            headers: {
              Authorization: `Bearer ${parsedUser.authKey}`,
            },
          }
        );

        return response?.data?.data;
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

export interface TalentProps {
  loading: boolean;
  currentTalents: any;
  engageTalents: any;
  talentData: any;
  page: number;
  pageSize: number;
  totalPages: number;
  totalTalent: number;
  status: string;
  error: null | unknown;
}

const initialState: TalentProps = {
  loading: false,
  currentTalents: [],
  engageTalents: [],
  talentData: {},
  page: 1,
  pageSize: 1,
  totalPages: 1,
  totalTalent: 0,
  status: "idle",
  error: null,
};

const currentengageSlice = createSlice({
  name: "currentengage",
  // initialState: {
  //   currentTalents: [],
  //   engageTalents: [],
  //   status: "idle",
  //   error: null as unknown,
  // },
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentEngageTalents.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentEngageTalents.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.currentTalents = action.payload?.talent;
        state.engageTalents = action.payload?.talent;
        state.page = action.payload?.page;
        state.pageSize = action.payload?.pageSize;
        state.totalPages = action.payload?.totalPages;
        state.totalTalent = action.payload?.totalProjects;
      })
      .addCase(fetchCurrentEngageTalents.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default currentengageSlice.reducer;
