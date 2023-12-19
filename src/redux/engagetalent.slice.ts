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
  "talents/fetchEngageTalents",
  async () => {
    const user = localStorage.getItem("userData");
    try {
      if (user !== null) {
        const parsedUser = JSON.parse(user);

        const response = await campaignAuthAxiosInstance(`/engaged-talents`, {
          headers: {
            Authorization: `Bearer ${parsedUser.authKey}`,
          },
        });

        const talentsCurrentlyOnProject =
          response?.data?.data?.talentsCurrentlyOnProject;
        const talentEngaged = response?.data?.data?.talentEngaged;

        console.log("cost", talentsCurrentlyOnProject);
        console.log("engage", talentEngaged);

        return { talentsCurrentlyOnProject, talentEngaged };
      }
    } catch (error: any) {
      if (error.response) {
        console.error("Response Error:", error.response.data);
        throw new Error("Failed to fetch engaged talents. Please try again.");
      } else if (error.request) {
        console.error("Request Error:", error.request);
        throw new Error(
          "No response received. Please check your network connection."
        );
      } else {
        console.error("General Error:", error.message);
        throw new Error(
          "An unexpected error occurred. Please try again later."
        );
      }
    }
  }
);

const engagedTalents = createSlice({
  name: "fetchEngageTalents",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.talents = action.payload.talentsCurrentlyOnProject;
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
          state.talents = action.payload.talentsCurrentlyOnProject;
          state.prev = action.payload.talentsCurrentlyOnProject;
          state.count = action.payload.talentsCurrentlyOnProject.length;
          state.next = action.payload.talentsCurrentlyOnProject;
          state.talentEngaged = action.payload.talentEngaged

          // Dispatch the setTalentEngaged action to update the state with talentEngaged
        const { talentEngaged } = action.payload;
          engagedTalents.actions.setTalentEngaged({ payload: talentEngaged });
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
