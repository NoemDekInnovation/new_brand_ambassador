import { authAxiosInstance } from "../api/axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface SkillsStateProps {
  loading: boolean;
  error: string | null;
  skills: { results: string[] };
  skillsFetchSucess: boolean;
}

// Thunk action to fetch skills data from the API
export const fetchSkills = createAsyncThunk(
  "skills/fetchSkills",
  async (skill: string) => {
    const response = await authAxiosInstance(`/search-skills?skill=${skill}`);
    return response.data;
  }
);

const initialState: SkillsStateProps = {
  loading: false,
  error: null,
  skills: { results: [] },
  skillsFetchSucess: false,
};

const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    reset: (state) => {
      state.skillsFetchSucess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.skills = action.payload;
        state.skillsFetchSucess = true;
      })
      .addCase(fetchSkills.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default skillsSlice.reducer;
export const { reset } = skillsSlice.actions;
