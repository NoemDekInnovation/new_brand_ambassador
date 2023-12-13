import { ProjectProps } from "./types";
import { campaignAuthAxiosInstance } from "../api/axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ApplicationsProps {
  loading: boolean;
  error: string | null;
  applications: any;
}

const initialState: ApplicationsProps = {
  loading: false,
  error: "",
  applications: [],
};

export const fetchApplications = createAsyncThunk(
  "talents/Applications",
  async (project: string) => {
    const user = localStorage.getItem("userData");
    try {
      if (user !== null) {
        const parsedUser = JSON.parse(user);
        const response = await campaignAuthAxiosInstance(
          `/project-applications/${project}`,
          {
            headers: {
              Authorization: `Bearer ${parsedUser.authKey}`,
            },
          }
        );

        console.log(response);

        return response.data;
      }
    } catch (error) {
      throw error;
    }
  }
);

const Applications = createSlice({
  name: "talents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchApplications.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = null;
          state.applications = action.payload;
        }
      )
      .addCase(fetchApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failde to fetch publish project";
      });
  },
});

export default Applications.reducer;
