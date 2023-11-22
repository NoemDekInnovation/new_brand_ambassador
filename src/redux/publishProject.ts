import { ProjectProps } from "./types";
import { authAxiosInstance } from "../api/axios";
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
  async (url: string) => {
    console.log(url);
    try {
      if (url != undefined) {
        const response = await authAxiosInstance(`/${url}/published-projects`);
        console.log(response);
        return response.data.data.projects;
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
      .addCase(fetchpublishproject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchpublishproject.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(fetchpublishproject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failde to fetch publish project";
      });
  },
});

export default publishProjects.reducer;
