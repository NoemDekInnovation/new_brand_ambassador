import { TalentProps } from "./types";
import { authAxiosInstance, campaignAuthAxiosInstance } from "../api/axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface TalentsProps {
  loading: boolean;
  error: string | null;
  message: string;
  talents: any;
  talentEngaged: any; // New property for talentEngaged

  successfulImport: [];
  failedImport: [];
  count: number;
  prevProducts: string | null;
  nextProducts: string | null;
  prev: string | null;
  next: string | null;
}

const initialState: TalentsProps = {
  loading: false,
  error: "",
  message: "",
  talents: [],
  talentEngaged: [], // Initial value for talentEngaged

  successfulImport: [],
  failedImport: [],
  count: 0,
  prev: "",
  next: "",
  prevProducts: "",
  nextProducts: "",
};

export const fetchEngageTalents = createAsyncThunk(
  "talents/fetchTalents",
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

const engagedTalents = createSlice({
  name: "fetchEngageTalents",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.talents = action.payload;
    },
    setFailedImport: (state, action) => {
      state.failedImport = action.payload;
    },
    setSuccessImport: (state, action) => {
      state.successfulImport = action.payload;
    },
    setTalentEngaged: (state, action) => {
      state.talentEngaged = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEngageTalents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchEngageTalents.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.talents = action.payload;
          state.prev = action.payload;
          state.count = action.payload;
          state.next = action.payload;
          state.talentEngaged = action.payload;

          // Dispatch the setTalentEngaged action to update the state with talentEngaged
          // const { talentEngaged } = action.payload;
          // engagedTalents.actions.setTalentEngaged({ payload: talentEngaged });
        }
      )
      .addCase(
        fetchEngageTalents.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default engagedTalents.reducer;
export const { setUser, setSuccessImport, setFailedImport, setTalentEngaged } =
  engagedTalents.actions;
