import { ProjectProps } from "./types";
import { campaignAuthAxiosInstance } from "../api/axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface talentInvitationsProps {
  loading: boolean;
  error: string | null;
  talentInvitations: any;
  page: number;
  totalPages: number;
  totalInvitations: number;
  pageSize: number;
  totalApplied: number;
  totalRejected: number;
  totalNotApplied: number;
}

const initialState: talentInvitationsProps = {
  loading: false,
  error: "",
  talentInvitations: [],
  page: 1,
  totalPages: 1,
  totalInvitations: 0,
  pageSize: 20,
  totalApplied: 0,
  totalRejected: 0,
  totalNotApplied: 0,
};

export const fetchTalentInvitations = createAsyncThunk(
  "talents/talentInvitations",
  async () => {
    const user = localStorage.getItem("userData");
    try {
      if (user !== null) {
        const parsedUser = JSON.parse(user);
        const response = await campaignAuthAxiosInstance(`/invitations`, {
          headers: {
            Authorization: `Bearer ${parsedUser.authKey}`,
          },
        });

        // console.log(response.data.data);

        return response.data.data;
      }
    } catch (error) {
      throw error;
    }
  }
);

const talentInvitationss = createSlice({
  name: "talents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTalentInvitations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTalentInvitations.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = null;
          state.talentInvitations = action.payload;
          state.page = action.payload.page;
          state.totalPages = action.payload.totalPages;
          state.totalInvitations = action.payload.totalInvitations;
          state.pageSize = action.payload.pageSize;
          state.totalApplied = action.payload.totalApplied;
          state.totalRejected = action.payload.totalRejected;
          state.totalNotApplied = action.payload.totalNotApplied;
        }
      )
      .addCase(fetchTalentInvitations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failde to fetch publish project";
      });
  },
});

export default talentInvitationss.reducer;
