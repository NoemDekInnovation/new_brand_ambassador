import { authAxiosInstance } from "../api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAgencyTalentss = createAsyncThunk(
  "talents/fetchAgencyTalents",
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

          const response = await authAxiosInstance(
            `/agency-talent?${queryString}`,
            {
              headers: {
                Authorization: `Bearer ${parsedUser.authKey}`,
              },
            }
          );

          // console.log("myTalents", response?.data?.data?.talent);

          return response?.data?.data;
        }
        const response = await authAxiosInstance(
          "/agency-talent",
          // "/agency-talent?search=lecule&gender=male&opportunities=supervisor&location=lagos&minAge=0&maxAge=30",
          {
            headers: {
              Authorization: `Bearer ${parsedUser.authKey}`,
            },
          }
        );

        console.log(response?.data);
        return response?.data?.data;
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export interface TalentProps {
  loading: boolean;
  agencyTalents: any;
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
  agencyTalents: [],
  talentData: {},
  page: 1,
  pageSize: 1,
  totalPages: 1,
  totalTalent: 0,
  status: "idle",
  error: null,
};

const agencySlice = createSlice({
  name: "talents",
  // initialState: {
  //   agencyTalents: [],
  //   status: "idle",
  //   error: null as unknown,
  // },
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgencyTalentss.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAgencyTalentss.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.agencyTalents = action.payload?.talent;
        state.page = action.payload?.page;
        state.pageSize = action.payload?.pageSize;
        state.totalPages = action.payload?.totalPages;
        state.totalTalent = action.payload?.totalTalent;
      })
      .addCase(fetchAgencyTalentss.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default agencySlice.reducer;
