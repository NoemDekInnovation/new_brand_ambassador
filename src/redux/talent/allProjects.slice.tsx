import { ProjectProps } from "./../types";
import { campaignAuthAxiosInstance } from "../../api/axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface talentInvitationsProps {
  loading: boolean;
  error: string | null;
  allProjects: any;
  searchTerm: string;
  totalProjects: number;
  page: number;
  pageSize: number;
  totalPages: number;
  applied: string[];
  projectQuery: any;
}

const initialState: talentInvitationsProps = {
  loading: false,
  error: "",
  allProjects: [],
  searchTerm: "",
  totalProjects: 0,
  page: 1,
  pageSize: 1,
  totalPages: 1,
  applied: [],
  projectQuery: null,
};

export const fetchAllProjects = createAsyncThunk(
  "projects/allProjects",
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
            `/all-projects?${queryString}`,
            {
              headers: {
                Authorization: `Bearer ${parsedUser.authKey}`,
              },
            }
          );

          // console.log("myTalents", response?.data?.data?.talent);

          return response?.data?.data;
        }

        const response = await campaignAuthAxiosInstance(`/all-projects`, {
          headers: {
            Authorization: `Bearer ${parsedUser.authKey}`,
          },
        });
        console.log("response", response);

        return response.data.data;
      }
    } catch (error) {
      throw error;
    }
  }
);

const allProjects = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setProjectQuery: (state, action) => {
      state.projectQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllProjects.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = null;
          state.allProjects = action.payload?.availableProjects;
          state.totalProjects = action.payload.totalProjects;
          state.page = action.payload?.page;
          state.pageSize = action.payload?.pageSize;
          state.totalPages = action.payload?.totalPages;
          state.applied = action.payload?.applied;
        }
      )
      .addCase(fetchAllProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch publish project";
      });
  },
});

export const { setSearchTerm, setProjectQuery } = allProjects.actions;

export default allProjects.reducer;
