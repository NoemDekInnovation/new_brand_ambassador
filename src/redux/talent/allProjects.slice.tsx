import { ProjectProps } from "./../types";
import { campaignAuthAxiosInstance } from "../../api/axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface talentInvitationsProps {
  loading: boolean;
  error: string | null;
  allProjects: any;
  searchTerm: string;
}

const initialState: talentInvitationsProps = {
  loading: false,
  error: "",
  allProjects: [],
  searchTerm: "",
};

export const fetchAllProjects = createAsyncThunk(
  "projects/allProjects",
  async () => {
    const user = localStorage.getItem("userData");
    try {
      if (user !== null) {
        const parsedUser = JSON.parse(user);
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
          state.allProjects = action.payload;
        }
      )
      .addCase(fetchAllProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch publish project";
      });
  },
});

export const {
  setSearchTerm,
  // setFilter,
  // setCurrentPage,
  // setPageSize,
  // clearSearchAndFilter,
} = allProjects.actions;


export default allProjects.reducer;
