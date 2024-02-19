import { favProp } from "./types";
import { authAxiosInstance } from "../api/axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import {FavouriteProject} from "@/types"

export interface favouriteProjectProp {
  loading: boolean;
  error: string | null;
  favouriteTalents: any;
  talent: favProp[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalTalent: number;
}

const initialState: favouriteProjectProp = {
  loading: false,
  error: "",
  talent: [],
  favouriteTalents: [],
  page: 1,
  pageSize: 1,
  totalPages: 1,
  totalTalent: 0,
};

export const fetchLeadingProjects = createAsyncThunk(
  "favourite/fetchLeadingProjects",
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
            `/leading-talent?${queryString}`,
            // `/leading-talent?${queryString}&page=2&pageSize=5`,
            {
              headers: {
                Authorization: `Bearer ${parsedUser.authKey}`,
              },
            }
          );

          // console.log("myTalents", response?.data?.data?.talent);

          return response?.data?.data;
        }
        const response = await authAxiosInstance(`/leading-talent`, {
          headers: {
            Authorization: `Bearer ${parsedUser.authKey}`,
          },
        });

        console.log(response);
        console.log("response", response?.data?.data);

        return response?.data?.data;
      }
    } catch (error) {
      throw error;
    }
  }
);

const leadingProject = createSlice({
  name: "leading project",
  initialState,
  reducers: {
    filterFavorite: (state, action: PayloadAction<any>) => {
      let new_id = action.payload._id;

      const matchingIndex = state.talent.findIndex(
        (item: any) => item._id === new_id
      );

      if (matchingIndex !== -1) {
        // If a match is found, filter it out
        console.log("true");
        state.talent = state.talent.filter(
          (item, index) => index !== matchingIndex
        );
      } else {
        // If no match is found, add it to the array
        console.log("false");
        state.talent = [...state.talent, action.payload];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeadingProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchLeadingProjects.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.talent = action.payload?.talent;
          state.page = action.payload?.page;
          state.pageSize = action.payload?.pageSize;
          state.totalPages = action.payload?.totalPages;
          state.totalTalent = action.payload?.totalTalent;
          // state.favouriteTalents = action.payload[0].favoriteTalent;
        }
      )
      .addCase(fetchLeadingProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch favourited";
      });
  },
});

export default leadingProject.reducer;
export const { filterFavorite } = leadingProject.actions;
