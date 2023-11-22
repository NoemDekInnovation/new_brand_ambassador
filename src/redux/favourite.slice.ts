import { favProp } from "./types";
import { authAxiosInstance } from "../api/axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import {FavouriteProject} from "@/types"

export interface favouriteProjectProp {
  loading: boolean;
  error: string | null;
  favouriteTalents: any;
  favourites: favProp[];
}

const initialState: favouriteProjectProp = {
  loading: false,
  error: "",
  favourites: [],
  favouriteTalents: [],
};

export const fetchFavouriteProjects = createAsyncThunk(
  "favourite/fetchFavouriteProjects",
  async (url: string) => {
    // console.log(url);

    try {
      if (url !== undefined) {
        const response = await authAxiosInstance(`/${url}/favorites-filter`);

        // console.log(response);
        // console.log(response.data.favorites);

        return response.data.favorites;
      }
    } catch (error) {
      throw error;
    }
  }
);

const favoritesProject = createSlice({
  name: "favourite project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavouriteProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchFavouriteProjects.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.favourites = action.payload;

          // state.favouriteTalents = action.payload[0].favoriteTalent;
        }
      )
      .addCase(fetchFavouriteProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch favourited";
      });
  },
});

export default favoritesProject.reducer;
export const {} = favoritesProject.actions;
