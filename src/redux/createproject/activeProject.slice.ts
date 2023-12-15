import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { authAxiosInstance } from "../../api/axios";

type Project = {
  projectDuration: {
    startDate: string;
    endDate: string;
  };
  projectPost?: {
    startDate: string;
    endDate: string;
  };
  metaData: {
    createdBy: string;
    isActive: boolean;
  };
  _id: string;
  projectTitle: string;
  projectCategory: string;
  projectCode: string;
  projectLocation: string[];
  projectDescription: string;
  talent: Talent[];
  qualifications?: string[];
  skills?: string[];
  workingDays?: string[];
  budget?: Budget[];
  projectRequirements: string;
  document: any[]; // Replace `any` with a more specific type if possible
  createdAt: string;
  updatedAt: string;
  __v: number;
  draft: boolean;
};

type Talent = {
  opportunities: string;
  qualifications: string;
  skills: string[];
  paymentOptions?: string;
  workingOptions?: string;
  salary: string;
  _id: string;
};

type Budget = {
  opportunities: string;
  workingOptions: string;
  salary: string;
  _id: string;
};

type ResponseData = {
  projects: Project[];
};

type Projects = {
  projects: Project[];
};

type Data = {
  data: Projects;
};

// And then the overall response type would be:
type ApiResponse = {
  data: ResponseData;
};

type ProjectState = {
  loading: boolean;
  error: string | null;
  activeProjects: Data | null;
  publishedProjects: Data | null;
  completeProjects: Data | null;
  draftProjects: Data | null;
};

const initialState: ProjectState = {
  loading: false,
  error: null,
  activeProjects: null,
  publishedProjects: null,
  completeProjects: null,
  draftProjects: null,
};

export const fetchActiveProject = createAsyncThunk(
  "activeProject/fetchActiveProject",
  async (url: string) => {
    const response = await authAxiosInstance(`/${url}/active-projects`);
    return response?.data as Data;
  }
);

export const fetchPublishProject = createAsyncThunk(
  "publishProject/fetchPublishProject",
  async () => {
    const response = await authAxiosInstance(`/published-projects`);
    return response?.data as Data;
  }
);

export const fetchCompleteProject = createAsyncThunk(
  `completeProject/fetchCompleteProject`,
  async (url: string) => {
    const response = await authAxiosInstance(`/${url}/completed-projects`);
    return response?.data as Data;
  }
);

export const fetchDraftProject = createAsyncThunk(
  `draftProject/fetchDraftProject`,
  async (url: string) => {
    const response = await authAxiosInstance(`/${url}/draft-projects`);
    return response?.data as Data;
  }
);

const ProjectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle pending, fulfilled, and rejected for fetchActiveProjects
      .addCase(fetchActiveProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchActiveProject.fulfilled,
        (state, action: PayloadAction<Data>) => {
          state.loading = false;
          state.activeProjects = action.payload;
        }
      )
      .addCase(fetchActiveProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Could not fetch active projects";
      })
      // Handle pending, fulfilled, and rejected for fetchPublishedProjects
      .addCase(fetchPublishProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPublishProject.fulfilled,
        (state, action: PayloadAction<Data>) => {
          state.loading = false;
          state.publishedProjects = action.payload;
        }
      )
      .addCase(fetchPublishProject.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Could not fetch published projects";
      })
      //   Handle pending, fulfilled, and rejected for fetchCompletedProjects
      .addCase(fetchCompleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCompleteProject.fulfilled,
        (state, action: PayloadAction<Data>) => {
          state.loading = false;
          state.completeProjects = action.payload;
        }
      )
      .addCase(fetchCompleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Could not fetch complete projects";
      })
      //   Handle pending, fulfilled, and rejected for fetchDraftProject
      .addCase(fetchDraftProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDraftProject.fulfilled,
        (state, action: PayloadAction<Data>) => {
          state.loading = false;
          state.draftProjects = action.payload;
        }
      )
      .addCase(fetchDraftProject.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Could not fetch complete projects";
      });
  },
});

export default ProjectSlice.reducer;
