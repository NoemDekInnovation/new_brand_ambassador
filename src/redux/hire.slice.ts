import { authAxiosInstance, campaignAuthAxiosInstance } from "../api/axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ProjectApplication {
  loading: boolean;
  error: string | null;
  _id: string;
  agency: string;
  project: string;
  talent: string;
  status: string;
  applications: any[]; // Adjust this based on the actual type
  createdAt: string;
  updatedAt: string;
  failedImport: [];
  successfulImport: [];
}

// const initialState = {
//   loading: false,
//   error: null as string | null,
//   hiredTalent: [], // Updated property name based on the provided response structure
//   failedImport: [],
//   successfulImport: [],
// };
interface ProjectApplicationsState {
  loading: boolean;
  error: string | null;
  hiredTalent: ProjectApplication[];
  failedImport: { data: any; message: string }[]; // Adjust based on your actual type
  successfulImport: any[]; // Adjust based on your actual type
}

const initialState: ProjectApplicationsState = {
  loading: false,
  error: null,
  hiredTalent: [],
  failedImport: [],
  successfulImport: [],
};

interface FetchProjectApplicationsResponse {
  data: {
    hiredTalent: ProjectApplication[]; // Adjust based on your actual response structure
  };
}

export const fetchHiredTalent = createAsyncThunk(
  "hiredTalent/fetchHiredTalent",
  async ({ id }: { id: string }) => {
    const user = localStorage.getItem("userData");
    try {
      if (user !== null) {
        const parsedUser = JSON.parse(user);
        const response = await campaignAuthAxiosInstance(
          `/hired-talent/${id}`,
          {
            headers: {
              Authorization: `Bearer ${parsedUser.authKey}`,
            },
          }
        );
        console.log("my", response);
        return response.data.data;

        // return response.data.data;
      }
    } catch (error) {
      throw error;
    }
  }
);

const hiredTalent = createSlice({
  name: "hiredTalent",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.hiredTalent = action.payload;
    },
    setFailedImport: (state, action) => {
      state.failedImport = action.payload;
    },
    setSuccessImport: (state, action) => {
      state.successfulImport = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHiredTalent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchHiredTalent.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = null;
          state.hiredTalent = action.payload.hiredTalent; // Updated property name
        }
      )
      .addCase(fetchHiredTalent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export default hiredTalent.reducer;
