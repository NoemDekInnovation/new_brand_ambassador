import { ProjectProps } from "./types";
import { campaignAuthAxiosInstance } from "../api/axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface PublishProjectsProps {
  loading: boolean;
  error: string | null;
  publishProject: ProjectProps[];
  totalProjects: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

const initialState: PublishProjectsProps = {
  loading: false,
  error: "",
  publishProject: [],
  totalProjects: 0,
  page: 1,
  pageSize: 1,
  totalPages: 1,
};

export const fetchpublishproject = createAsyncThunk(
  "agency/fetchpublishproject",
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
            `/published-projects?${queryString}`,
            {
              headers: {
                Authorization: `Bearer ${parsedUser.authKey}`,
              },
            }
          );

          // console.log("myTalents", response?.data?.data?.talent);

          return response?.data?.data;
        }

        const response = await campaignAuthAxiosInstance(
          `/published-projects`,
          {
            headers: {
              Authorization: `Bearer ${parsedUser.authKey}`,
            },
          }
        );
        return response?.data?.data;
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
          state.publishProject = action.payload.publishedProjects;
          state.totalProjects = action.payload.totalProjects;
          state.page = action.payload?.page;
          state.pageSize = action.payload?.pageSize;
          state.totalPages = action.payload?.totalPages;
        }
      )
      .addCase(fetchpublishproject?.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failde to fetch publish project";
      });
  },
});

export default publishProjects.reducer;
