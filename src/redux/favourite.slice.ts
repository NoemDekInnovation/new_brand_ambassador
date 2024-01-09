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
  async (queryParams: { [key: string]: string | number } | null, thunkAPI) => {
    // console.log(url);
    const user = localStorage.getItem("userData");

    try {
      if (user !== null) {
        const parsedUser = JSON.parse(user);

        if (queryParams !== null && queryParams !== undefined) {
          // Build the query string based on the dynamic queryParams object
          const queryString = Object.entries(queryParams)
            .map(([key, value]) => `${key}=${value}`)
            .join("&");

          const response = await authAxiosInstance(
            `/favorites-filter?${queryString}&page=2&pageSize=5`,
            {
              headers: {
                Authorization: `Bearer ${parsedUser.authKey}`,
              },
            }
          );

          // console.log("myTalents", response?.data?.data?.talent);

          return response?.data?.data?.favorites;
        }
        const response = await authAxiosInstance(`/favorites-filter`, {
          headers: {
            Authorization: `Bearer ${parsedUser.authKey}`,
          },
        });

        // console.log(response);
        // console.log("response", response?.data?.data?.favorites);

        return response?.data?.data?.favorites;
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
