import { ProjectProps } from "./types";
import { campaignAuthAxiosInstance } from "../api/axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface PublishProjectsProps {
  loading: boolean;
  error: string | null;
  publishProject: ProjectProps[];
}

const initialState: PublishProjectsProps = {
  loading: false,
  error: "",
  publishProject: [],
};

export const fetchpublishproject = createAsyncThunk(
  "agency/fetchpublishproject",
  async () => {
    const user = localStorage.getItem("userData");

    try {
      if (user !== null) {
        const parsedUser = JSON.parse(user);
        const response = await campaignAuthAxiosInstance(
          `/published-projects`,
          {
            headers: {
              Authorization: `Bearer ${parsedUser.authKey}`,
            },
          }
        );
        return response?.data?.data?.publishedProjects;
      }
    } catch (error) {
      throw error;
    }
  }
);

const publishProjects = createSlice({
  name: "publish",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchpublishproject?.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchpublishproject?.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = null;
          state.publishProject = action.payload;
        }
      )
      .addCase(fetchpublishproject?.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failde to fetch publish project";
      });
  },
});

export default publishProjects.reducer;
