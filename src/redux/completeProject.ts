import { ProjectProps } from "./types";
import { campaignAuthAxiosInstance } from "../api/axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface CompleteProjectProps {
  loading: boolean;
  error: string | null;
  completeProject: ProjectProps[];
  totalProjects: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

const initialState: CompleteProjectProps = {
  loading: false,
  error: "",
  completeProject: [],
  totalProjects: 0,
  page: 1,
  pageSize: 1,
  totalPages: 1,
};

export const fetchcompleteproject = createAsyncThunk(
  "agency/completeproject",
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
            `/completed-projects?${queryString}`,
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
          `/completed-projects`,
          {
            headers: {
              Authorization: `Bearer ${parsedUser.authKey}`,
            },
          }
        );
        // console.log(response.data.data);

        return response.data.data;
      }
    } catch (error) {
      throw error;
    }
  }
);

const completeProjects = createSlice({
  name: "complete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchcompleteproject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchcompleteproject.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = null;
          state.completeProject = action.payload.completedProjects;
          state.totalProjects = action.payload.totalProjects;
          state.page = action.payload?.page;
          state.pageSize = action.payload?.pageSize;
          state.totalPages = action.payload?.totalPages;
        }
      )
      .addCase(fetchcompleteproject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failde to fetch publish project";
      });
  },
});

export default completeProjects.reducer;
