import { authAxiosInstance, campaignAuthAxiosInstance } from "../api/axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ProjectApplication {
  loading: boolean;
  error: string | null;
  _id: string;
  agency: string;
  project: string;
  talent: string;
  status: string;
  applications: any[]; // Adjust this based on the actual type
  createdAt: string;
  updatedAt: string;
  failedImport: [];
  successfulImport: [];
}

// const initialState = {
//   loading: false,
//   error: null as string | null,
//   projectApplications: [], // Updated property name based on the provided response structure
//   failedImport: [],
//   successfulImport: [],
// };
interface ProjectApplicationsState {
  loading: boolean;
  error: string | null;
  projectApplications: ProjectApplication[];
  failedImport: any[]; // Adjust based on your actual type
  successfulImport: any[]; // Adjust based on your actual type
}

const initialState: ProjectApplicationsState = {
  loading: false,
  error: null,
  projectApplications: [],
  failedImport: [],
  successfulImport: [],
};

interface FetchProjectApplicationsResponse {
  data: {
    projectApplications: ProjectApplication[]; // Adjust based on your actual response structure
  };
}

export const fetchProjectApplications = createAsyncThunk(
  "projectApplications/fetchProjectApplications",
  async (projectId: string) => {
    const user = localStorage.getItem("userData");
    try {
      if (user !== null) {
        const parsedUser = JSON.parse(user);
        const response = await authAxiosInstance.get(
          `/project-applications/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${parsedUser.authKey}`,
            },
          }
        );
        // console.log("my", response);
        return response.data.data.projectApplications;
      }
    } catch (error) {
      throw error;
    }
  }
);

const projectApplications = createSlice({
  name: "projectapplications",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.projectApplications = action.payload;
    },
    setFailedImport: (state, action) => {
      state.failedImport = action.payload;
    },
    setSuccessImport: (state, action) => {
      state.successfulImport = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProjectApplications.fulfilled,
        (state, action: PayloadAction<FetchProjectApplicationsResponse>) => {
          state.loading = false;
          state.error = null;
          state.projectApplications = action.payload.data.projectApplications; // Updated property name
        }
      )
      .addCase(fetchProjectApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export default projectApplications.reducer;
