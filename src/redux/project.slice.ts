import { authAxiosInstance } from "../api/axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Project {
  talentId: string;
}

interface Opportunity {
  role: string;
  salary: string;
}

interface ProjectDuration {
  startDate: string;
  endDate: string;
}

interface ProjectProps {
  projectTitle: string;
  projectCategory: string;
  projectCode: string;
  projectLocation: string;
  projectDescription: string;
  projectRequirements: string;
  document: string;
  projectDuration: ProjectDuration;
  talent: Project[];
  qualifications: string;
  skills: string;
  workingDays: string;
  opportunities: Opportunity[];
}

export interface ProjectStateProps {
  loading: boolean;
  error: string | null;
  message: string;
  project: ProjectProps[] | null;
}

// Thunk action to fetch users data from the API
export const fetchProjects = createAsyncThunk(
  "project/fetchProjects",
  async (url) => {
    const response = await authAxiosInstance(`/${url}/create-project`);
    return response.data;
  }
);

const initialState: ProjectStateProps = {
  loading: false,
  error: "",
  message: "",
  project: [],
};

const project = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        //   state.resData = action.payload.results;
      })
      .addCase(fetchProjects.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default project.reducer;
export const {} = project.actions;
