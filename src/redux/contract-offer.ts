import { ProjectProps } from "./types";
import { campaignAuthAxiosInstance } from "../api/axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface talentInvitationsProps {
  loading: boolean;
  error: string | null;
  talentOffers: any;
  offers: any;
  page: number;
  pageSize: number;
  totalOffers: number;
  totalAccepted: number;
  totalRejected: number;
  totalPages: number;
}

const initialState: talentInvitationsProps = {
  loading: false,
  error: "",
  talentOffers: [],
  offers: [],
  page: 1,
  pageSize: 20,
  totalOffers: 0,
  totalPages: 1,
  totalAccepted: 0,
  totalRejected: 0,
};

export const fetchTalentOffers = createAsyncThunk(
  "talents/talentOffers",
  async (queryParams: { [key: string]: string | number } | null, thunkAPI) => {
    const user = localStorage.getItem("userData");
    try {
      if (user !== null) {
        const parsedUser = JSON.parse(user);

        if (queryParams !== null && queryParams !== undefined) {
          // Build the query string based on the dynamic queryParams object
          const queryString = Object.entries(queryParams)
            .map(([key, value]) => `${key}=${value}`)
            .join("&");

          const response = await campaignAuthAxiosInstance(
            `/get-talent-offers?${queryString}`,
            {
              headers: {
                Authorization: `Bearer ${parsedUser.authKey}`,
              },
            }
          );

          // console.log("myTalents", response?.data?.data?.talent);

          return response?.data?.data;
        }

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
          state.offers = action.payload.offers;
          state.page = action.payload.page;
          state.pageSize = action.payload.pageSize;
          state.totalOffers = action.payload.totalOffers;
          state.totalPages = action.payload.totalPages;
          state.totalAccepted = action.payload.totalAccepted;
          state.totalRejected = action.payload.totalRejected;
        }
      )
      .addCase(fetchTalentOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failde to fetch publish project";
      });
  },
});

export default talentOffers.reducer;
