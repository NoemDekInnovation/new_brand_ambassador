import { ProjectProps } from "./types";
import { campaignAuthAxiosInstance } from "../api/axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface CompleteProjectProps {
  loading: boolean;
  error: string | null;
  completeProject: ProjectProps[];
}

const initialState: CompleteProjectProps = {
  loading: false,
  error: "",
  completeProject: [],
};

export const fetchcompleteproject = createAsyncThunk(
  "agency/completeproject",
  async () => {
    const user = localStorage.getItem("userData");
    try {
      if (user !== null) {
        const parsedUser = JSON.parse(user);
        const response = await campaignAuthAxiosInstance(
          `/completed-projects`,
          {
            headers: {
              Authorization: `Bearer ${parsedUser.authKey}`,
            },
          }
        );
        console.log(response.data);
        return response.data.data.projects;
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
          state.completeProject = action.payload;
        }
      )
      .addCase(fetchcompleteproject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failde to fetch publish project";
      });
  },
});

export default completeProjects.reducer;
