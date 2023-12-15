import { ProjectProps } from "./types";
import { campaignAuthAxiosInstance } from "../api/axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface talentInvitationsProps {
  loading: boolean;
  error: string | null;
  talentOffers: any;
}

const initialState: talentInvitationsProps = {
  loading: false,
  error: "",
  talentOffers: [],
};

export const fetchTalentOffers = createAsyncThunk(
  "talents/talentOffers",
  async () => {
    const user = localStorage.getItem("userData");
    try {
      if (user !== null) {
        const parsedUser = JSON.parse(user);
        const response = await campaignAuthAxiosInstance(`/get-talent-offers`, {
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

const talentOffers = createSlice({
  name: "talents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTalentOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTalentOffers.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = null;
          state.talentOffers = action.payload;
        }
      )
      .addCase(fetchTalentOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failde to fetch publish project";
      });
  },
});

export default talentOffers.reducer;
