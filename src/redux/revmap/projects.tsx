// import { ProjectProps } from "./types";
// import { campaignAuthAxiosInstance } from "../api/axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { campaignAuthAxiosInstance } from "../../api/axios";
import { ProjectProps } from "../types";

export interface PublishProjectsProps {
  loading: boolean;
  error: string | null;
  publishProject: ProjectProps[];
  totalProjects: number;
  page: number;
  pageSize: number;
  totalPages: number;
  selectedProject: any;
  projectQuery: any;
}

const initialState: PublishProjectsProps = {
  loading: false,
  error: "",
  publishProject: [],
  totalProjects: 0,
  page: 1,
  pageSize: 1,
  totalPages: 1,
  selectedProject: null,
  projectQuery: null,
};

export const fetchpublishprojects = createAsyncThunk(
  "projects/fetchpublishprojects",
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
            `/get-projects?${queryString}&status=published`,
            {
              headers: {
                Authorization: `Bearer ${parsedUser.authKey}`,
              },
            }
          );

          // console.log("myTalents revamp", response?.data);

          return response?.data?.data;
        }

        const response = await campaignAuthAxiosInstance(
          `/get-projects?status=published`,
          {
            headers: {
              Authorization: `Bearer ${parsedUser.authKey}`,
            },
          }
        );
        // console.log(response.data);

        return response?.data?.data;
      }
    } catch (error) {
      throw error;
    }
  }
);

const projects = createSlice({
  name: "projects",
  initialState,
  reducers: {
    // Reducer to handle successful project import
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
      state.loading = false;
    },
    setProjectQuery: (state, action) => {
      state.projectQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchpublishprojects?.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchpublishprojects?.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = null;
          state.publishProject = action.payload.projects;
          state.totalProjects = action.payload.totalProjects;
          state.page = action.payload?.page;
          state.pageSize = action.payload?.pageSize;
          state.totalPages = action.payload?.totalPages;
        }
      )
      .addCase(fetchpublishprojects?.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch publish project";
      });
  },
});

export const { setSelectedProject, setProjectQuery } = projects.actions;
export default projects.reducer;
