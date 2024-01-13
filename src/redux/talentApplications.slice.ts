import { ProjectProps } from "./types";
import { campaignAuthAxiosInstance } from "../api/axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface talentApplicationsProps {
  loading: boolean;
  error: string | null;
  talentApplications: any;
  page: number;
  pageSize: number;
  totalApplications: number;
  totalPages: number;
  totalPending: number;
  totalRejected: number;
  totalSuccessful: number;
}

const initialState: talentApplicationsProps = {
  loading: false,
  error: "",
  talentApplications: [],
  page: 1,
  pageSize: 20,
  totalApplications: 0,
  totalPages: 1,
  totalPending: 0,
  totalRejected: 0,
  totalSuccessful: 0,
};

export const fetchTalentApplications = createAsyncThunk(
  "talents/talentApplications",
  async () => {
    const user = localStorage.getItem("userData");
    try {
      if (user !== null) {
        const parsedUser = JSON.parse(user);
        const response = await campaignAuthAxiosInstance(
          `/get-talent-applications`,
          {
            headers: {
              Authorization: `Bearer ${parsedUser.authKey}`,
            },
          }
        );

        return response.data.data;
      }
    } catch (error) {
      throw error;
    }
  }
);

const talentApplications = createSlice({
  name: "talents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTalentApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTalentApplications.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = null;
          state.page = action.payload?.page;
          state.pageSize = action.payload?.pageSize;
          state.totalApplications = action.payload?.totalApplications;
          state.totalPages = action.payload?.totalPages;
          state.totalPending = action.payload?.totalPending;
          state.totalRejected = action.payload?.totalRejected;
          state.totalSuccessful = action.payload?.totalSuccessful;
          state.talentApplications = action.payload?.talentApplications;
        }
      )
      .addCase(fetchTalentApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failde to fetch publish project";
      });
  },
});

export default talentApplications.reducer;
