import { ProjectProps } from "./types";
import { campaignAuthAxiosInstance } from "../api/axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ApplicationsProps {
  loading: boolean;
  error: string | null;
  approvalStatus: string;
  applications: any;
  status: "shortlisted" | "rejected" | "hired" | "All";
  applicationsQuery: any;
  page: 1;
  pageSize: 20;
  projectApplications: [];
  totalApplications: number;
  totalApprovedHires: number | null;
  totalBAs: number | null;
  totalPages: number | null;
  totalRejected: number | null;
  totalShortlists: number | null;
  totalSupervisors: number | null;
  totalTrained: number | null;
  totalUshers: number | null;
}

const initialState: ApplicationsProps = {
  loading: false,
  error: "",
  approvalStatus: "",
  applications: [],
  applicationsQuery: [],
  status: "All",
  page: 1,
  pageSize: 20,
  projectApplications: [],
  totalApplications: 0,
  totalApprovedHires: 0,
  totalBAs: 0,
  totalPages: 0,
  totalRejected: 0,
  totalShortlists: 0,
  totalSupervisors: 0,
  totalTrained: 0,
  totalUshers: 0,
};

export const fetchApplications = createAsyncThunk(
  "talents/Applications",
  async (
    {
      id,
      status,
      queryParams,
    }: {
      id: string;
      status?: string;
      queryParams: { [key: string]: string | number } | null;
    },
    thunkAPI
  ) => {
    const user = localStorage.getItem("userData");
    try {
      if (user !== null) {
        const parsedUser = JSON.parse(user);
        if (status !== undefined && status !== null) {
          if (queryParams !== null && queryParams !== undefined) {
            // Build the query string based on the dynamic queryParams object
            const queryString = Object.entries(queryParams)
              .map(([key, value]) => `${key}=${value}`)
              .join("&");

            const response = await campaignAuthAxiosInstance(
              `/shortlist-filter?project=${id}&status=${status}&${queryString}`,
              {
                headers: {
                  Authorization: `Bearer ${parsedUser.authKey}`,
                },
              }
            );

            // console.log("All Talent", response?.data?.data);

            return response?.data?.data;
          }

          const response = await campaignAuthAxiosInstance(
            `/shortlist-filter?project=${id}&status=${status}`,
            {
              headers: {
                Authorization: `Bearer ${parsedUser.authKey}`,
              },
            }
          );
          console.log(response.data);

          return response.data.data;
        }
        if (queryParams !== null && queryParams !== undefined) {
          // Build the query string based on the dynamic queryParams object
          const queryString = Object.entries(queryParams)
            .map(([key, value]) => `${key}=${value}`)
            .join("&");

          const response = await campaignAuthAxiosInstance(
            `/project-applications/${id}?${queryString}`,
            {
              headers: {
                Authorization: `Bearer ${parsedUser.authKey}`,
              },
            }
          );

          // console.log("All Talent", response?.data?.data);

          return response?.data;
        }

        const response = await campaignAuthAxiosInstance(
          `/project-applications/${id}`,
          {
            headers: {
              Authorization: `Bearer ${parsedUser.authKey}`,
            },
          }
        );

        return response.data;
      }
    } catch (error) {
      throw error;
    }
  }
);

export const filterApplications = createAsyncThunk(
  "talents/filterApplications",
  async ({ id, status }: { id: string; status?: string }) => {
    const user = localStorage.getItem("userData");
    try {
      if (user !== null) {
        const parsedUser = JSON.parse(user);
        if (status !== undefined && status !== null) {
          const response = await campaignAuthAxiosInstance(
            `/shortlist-filter?project=${id}&status=${status}`,
            {
              headers: {
                Authorization: `Bearer ${parsedUser.authKey}`,
              },
            }
          );

          console.log(response.data.data);

          return response.data.data;
        }
      }
    } catch (error) {
      throw error;
    }
  }
);

const Applications = createSlice({
  name: "talents",
  initialState,
  reducers: {
    setApproval: (state, action: PayloadAction<string>) => {
      state.approvalStatus = action.payload;
    },
    setApprovalStatus: (state, action: PayloadAction<string>) => {
      state.approvalStatus = action.payload;
    },
    setStatus: (state, action: PayloadAction<any>) => {
      state.totalRejected = action.payload?.totalRejected;
      state.totalShortlists = action.payload?.totalShortlists;
      state.totalTrained = action.payload?.totalTrained;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchApplications.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = null;
          state.applications = action.payload;
          state.pageSize = action.payload?.data?.pageSize;
          state.totalPages = action.payload?.data?.totalPages;
          state.totalApplications = action.payload?.data?.totalApplications;
          state.totalApprovedHires = action.payload?.data?.totalApprovedHires;
          state.totalBAs = action.payload?.data?.totalBAs;
          state.totalPages = action.payload?.data?.totalPages;
          state.totalRejected = action.payload?.data?.totalRejected;
          state.totalShortlists = action.payload?.data?.totalShortlists;
          state.totalTrained = action.payload?.data?.totalTrained;
          state.totalSupervisors = action.payload?.data?.totalSupervisors;
          state.totalUshers = action.payload?.data?.totalUshers;
        }
      )
      .addCase(fetchApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failde to fetch publish project";
      })
      .addCase(filterApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        filterApplications.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = null;
          state.applicationsQuery = action.payload;
          state.totalRejected = action.payload?.totalRejected;
          state.totalShortlists = action.payload?.totalShortlists;
          state.totalTrained = action.payload?.totalTrained;
        }
      )
      .addCase(filterApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failde to fetch publish project";
      });
  },
});

export const { setApproval, setStatus } = Applications.actions;

export default Applications.reducer;
