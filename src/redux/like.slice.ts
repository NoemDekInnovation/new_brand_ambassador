import { authAxiosInstance, campaignAuthAxiosInstance } from "../api/axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const addFavorites = createAsyncThunk(
  "favorites/addFavorites",
  async (_, thunkAPI) => {
    const user = localStorage.getItem("userData");

    try {
      if (user !== null) {
        const parsedUser = JSON.parse(user);

        const response = await authAxiosInstance.post(
          "/add-favorites",
          {
            headers: {
              Authorization: `Bearer ${parsedUser.authKey}`,
            },
          }
        );

        return response?.data;
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const removeFavorites = createAsyncThunk(
  "favorites/removeFavorites",
  async (_,thunkAPI) => {
    const user = localStorage.getItem("userData");

    try {
      if (user !== null) {
        const parsedUser = JSON.parse(user);

        const response = await authAxiosInstance.post(
          "/remove-favorites",
          {
            headers: {
              Authorization: `Bearer ${parsedUser.authKey}`,
            },
          }
        );

        return response?.data;
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


interface FavoriteState {
  status: string;
  error: any; 
  data: any;
}

const initialState: FavoriteState = {
  status: "idle",
  error: null,
  data: null
};

const favoriteSlices = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFavorites.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addFavorites.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(addFavorites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(removeFavorites.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFavorites.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(removeFavorites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});


export default favoriteSlices.reducer;
