import { TalentProps, editProfile } from "./types";
import { authAxiosInstance, campaignAuthAxiosInstance } from "../api/axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { useSession } from "next-auth/react";

export interface TalentQueryProp {
  [key: string]: string | number;
}

export interface TalentsProps {
  loading: boolean;
  error: string | null;
  message: string;
  talents: TalentProps[];
  agencyTalents: any;
  talentData: any;
  agencyProfile: any;

  successfulImport: [];
  failedImport: [];
  count: number;
  prevProducts: string | null;
  nextProducts: string | null;
  prev: string | null;
  next: string | null;
  talentQuery: TalentQueryProp | null;
}
const initialState: TalentsProps = {
  loading: false,
  error: "",
  message: "",
  talents: [],
  agencyTalents: [],
  talentData: {},
  agencyProfile: {},
  successfulImport: [],
  failedImport: [],
  count: 0,
  prev: "",
  next: "",
  prevProducts: "",
  nextProducts: "",
  talentQuery: null,
};

export const fetchTalents = createAsyncThunk(
  "categories/fetchTalents",
  async (queryParams: { [key: string]: string | number } | null, thunkAPI) => {
    const user = localStorage.getItem("userData");
    // console.log("All Talent", "response?.data?.data");

    try {
      if (user !== null) {
        const parsedUser = JSON.parse(user);

        if (queryParams !== null && queryParams !== undefined) {
          // Build the query string based on the dynamic queryParams object
          const queryString = Object.entries(queryParams)
            .map(([key, value]) => `${key}=${value}`)
            .join("&");

          const response = await authAxiosInstance(
            `/all-talents?${queryString}`,
            {
              headers: {
                Authorization: `Bearer ${parsedUser.authKey}`,
              },
            }
          );

          // console.log("All Talent", response?.data?.data);

          return response?.data?.data;
        }

        const response = await authAxiosInstance(`/all-talents`, {
          headers: {
            Authorization: `Bearer ${parsedUser.authKey}`,
          },
        });

        // console.log("checker", response?.data?.data);
        return response?.data?.data;
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchFavoriteTalents = createAsyncThunk(
  "categories/fetchFavoriteTalents",
  async () => {
    const user = localStorage.getItem("userData");

    try {
      if (user !== null) {
        const parsedUser = JSON.parse(user);

        const response = await authAxiosInstance(`/favorites-filter`, {
          headers: {
            Authorization: `Bearer ${parsedUser.authKey}`,
          },
        });

        // console.log("checker", response.data);
        return response.data.data;
      }
    } catch (error) {
      throw error;
    }
  }
);

export const fetchAgencyTalents = createAsyncThunk(
  "categories/fetchAgencyTalents",
  async () => {
    const user = localStorage.getItem("userData");

    try {
      if (user !== null) {
        const parsedUser = JSON.parse(user);

        const response = await authAxiosInstance(`/agency-talent`, {
          headers: {
            Authorization: `Bearer ${parsedUser.authKey}`,
          },
        });

        // console.log("checker", response?.data?.data?.talent);
        return response?.data?.data?.talent;
      }
    } catch (error) {
      throw error;
    }
  }
);

export const fetchUserTalentsData = createAsyncThunk(
  "fetchusertalentdata",
  async () => {
    const user = localStorage.getItem("userData");

    try {
      if (user !== null) {
        const parsedUser = JSON.parse(user);

        const response = await campaignAuthAxiosInstance(
          `/get-talent-profile`,
          {
            headers: {
              Authorization: `Bearer ${parsedUser.authKey}`,
            },
          }
        );

        // console.log("talentprofile", response.data);
        return response.data.data;
      }
    } catch (error) {
      throw error;
    }
  }
);

export const fetchAgencyProfile = createAsyncThunk(
  "fetchagencyprofile",
  async () => {
    const user = localStorage.getItem("userData");

    try {
      if (user !== null) {
        const parsedUser = JSON.parse(user);

        const response = await authAxiosInstance(`/get-agency-profile`, {
          headers: {
            Authorization: `Bearer ${parsedUser.authKey}`,
          },
        });

        // console.log("agency", response.data.data);
        return response.data.data;
      }
    } catch (error) {
      throw error;
    }
  }
);

const talents = createSlice({
  name: "talents",
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
    setTalentQuery: (state, action) => {
      state.talentQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTalents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTalents.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.talents = action.payload?.talents;
        state.prev = action.payload?.prev;
        state.count = action.payload?.count; // Store the count
        state.next = action.payload?.next;
      })
      .addCase(fetchTalents.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAgencyTalents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAgencyTalents.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.agencyTalents = action.payload.talents;
          state.prev = action.payload.prev;
          state.count = action.payload.count; // Store the count
          state.next = action.payload.next;
        }
      )
      .addCase(
        fetchAgencyTalents.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(fetchUserTalentsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserTalentsData.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.talentData = action.payload;
        }
      )
      .addCase(
        fetchUserTalentsData.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(fetchAgencyProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAgencyProfile.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.agencyProfile = action.payload;
        }
      )
      .addCase(
        fetchAgencyProfile.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default talents.reducer;
export const { setUser, setSuccessImport, setFailedImport, setTalentQuery } =
  talents.actions;
