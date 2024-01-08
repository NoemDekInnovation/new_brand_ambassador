import { authAxiosInstance, campaignAuthAxiosInstance } from "../api/axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

          return response?.data?.data?.talent;
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

        // console.log("myTalents", response?.data?.data?.talent);

        return response?.data?.data?.talent;
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const agencySlice = createSlice({
  name: "talents",
  initialState: {
    agencyTalents: [],
    status: "idle",
    error: null as unknown,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgencyTalentss.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAgencyTalentss.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.agencyTalents = action.payload;
      })
      .addCase(fetchAgencyTalentss.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default agencySlice.reducer;
