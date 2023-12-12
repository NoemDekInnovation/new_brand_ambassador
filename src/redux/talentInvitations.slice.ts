import { ProjectProps } from "./types";
import { campaignAuthAxiosInstance } from "../api/axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface talentInvitationsProps {
  loading: boolean;
  error: string | null;
  talentInvitations: any;
}

const initialState: talentInvitationsProps = {
  loading: false,
  error: "",
  talentInvitations: [],
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
        }
      )
      .addCase(fetchTalentInvitations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failde to fetch publish project";
      });
  },
});

export default talentInvitationss.reducer;
