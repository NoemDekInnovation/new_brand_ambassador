import { ProjectProps } from "./types";
import { campaignAuthAxiosInstance } from "../api/axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type ProjectDuration = {
  startDate: string;
  endDate: string;
};

type ProjectPost = {
  startDate: string | null;
  endDate: string | null;
};

type Talent = {
  skills: string[]; // You can replace this with the actual type of skills
  paymentOptions: string;
  salary: string;
  _id: string;
};

type Project = {
  projectDuration: ProjectDuration;
  projectPost: ProjectPost;
  metaData: {
    createdBy: string;
    isActive: boolean;
  };
  _id: string;
  draft: boolean;
  projectTitle: string;
  projectCategory: string;
  projectCode: string;
  projectLocation: string[];
  projectDescription: string;
  talent: Talent[];
  workingDays: string[];
  projectRequirements: string;
  document: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type ProjectListResponse = {
  projects: Project[];
};

export interface ActiveProjectsProps {
  loading: boolean;
  error: string | null;
  totalProjects: number;
  activeProject: Project[];
  page: number;
  pageSize: number;
  totalPages: number;
}

const initialState: ActiveProjectsProps = {
  loading: false,
  error: "",
  activeProject: [],
  totalProjects: 0,
  page: 1,
  pageSize: 1,
  totalPages: 1,
};

export const fetchactiveproject = createAsyncThunk(
  "agency/fetchactiveproject",
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
            `/all-active-projects?${queryString}`,
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
          `/all-active-projects`,
          {
            headers: {
              Authorization: `Bearer ${parsedUser.authKey}`,
            },
          }
        );

        return response.data;
      }
    } catch (error) {
      throw error;
    }
  }
);

const activeProjects = createSlice({
  name: "active",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchactiveproject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchactiveproject.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = null;
          state.activeProject = action.payload.projects;
          state.totalProjects = action.payload.totalProjects;
          state.page = action.payload?.page;
          state.pageSize = action.payload?.pageSize;
          state.totalPages = action.payload?.totalPages;
        }
      )
      .addCase(fetchactiveproject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch publish project";
      });
  },
});

export default activeProjects.reducer;
