import { authAxiosInstance } from "../api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchAgencyOutlet = createAsyncThunk(
  "agency/outlet",
  async () => {
    const user = localStorage.getItem("userData");

    try {
      if (user !== null) {
        const parsedUser = JSON.parse(user);
        const response = await authAxiosInstance(
          `/all-outlets`,
          // `/all-talents?page=2&pageSize=5`,
          {
            headers: {
              Authorization: `Bearer ${parsedUser.authKey}`,
            },
          }
        );

        return response?.data?.data;
      }
    } catch (error: any) {
      return error;
    }
  }
);

export interface TalentProps {
  loading: boolean;
  outlet: any;
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
  outlet: [],
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
      .addCase(fetchAgencyOutlet.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAgencyOutlet.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.outlet = action.payload?.outlet;
        state.page = action.payload?.page;
        state.pageSize = action.payload?.pageSize;
        state.totalPages = action.payload?.totalPages;
        state.totalTalent = action.payload?.totalTalent;
      })
      .addCase(fetchAgencyOutlet.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default agencySlice.reducer;
