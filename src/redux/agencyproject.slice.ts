// import { AgencyProjectProps } from "./types";
import { authAxiosInstance } from "../api/axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface AgencyProjectsProps {
  loading: boolean;
  error: string | null;
  message: string;
  agencyprojects: [] | null;
  successfullImport: [];
  failedImport: [];
}

const initialState: AgencyProjectsProps = {
  loading: false,
  error: "",
  message: "",
  agencyprojects: [],
  successfullImport: [],
  failedImport: [],
};

export const fetchagencyprojects = createAsyncThunk(
  "agency/fetchProjects",
  async (url: string) => {
    try {
      const response = await authAxiosInstance(`/${url}/active-projects`);

      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);

const agencyprojects = createSlice({
  name: "agencyprojects",
  initialState,
  reducers: {
    // Reducer to handle successful project import
    importSuccess: (state, action) => {
      state.successfullImport = action.payload;
      state.loading = false;
    },

    // Reducer to handle failed project import
    importFailure: (state, action) => {
      state.failedImport = action.payload;
      state.loading = false;
    },

    // Reducer to reset import status
    resetImportStatus: (state) => {
      state.successfullImport = [];
      state.failedImport = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchagencyprojects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchagencyprojects.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.agencyprojects = action.payload;
        }
      )
      .addCase(fetchagencyprojects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch projects.";
      });
  },
});

export default agencyprojects.reducer;
export const { importSuccess, importFailure, resetImportStatus } =
  agencyprojects.actions;
