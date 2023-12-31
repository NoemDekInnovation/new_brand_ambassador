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
}

const initialState: ActiveProjectsProps = {
  loading: false,
  error: "",
  activeProject: [],
  totalProjects: 0,
};

export const fetchactiveproject = createAsyncThunk(
  "agency/fetchactiveproject",
  async () => {
    const user = localStorage.getItem("userData");

    try {
      if (user !== null) {
        const parsedUser = JSON.parse(user);
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
        }
      )
      .addCase(fetchactiveproject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failde to fetch publish project";
      });
  },
});

export default activeProjects.reducer;
