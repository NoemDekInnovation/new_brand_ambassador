import { ProjectProps } from "./types";
import { campaignAuthAxiosInstance } from "../api/axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ApplicationsProps {
  loading: boolean;
  error: string | null;
  approvalStatus: string;
  applications: any;
  status: "shortlisted" | "rejected" | "hired" | "All";
}

const initialState: ApplicationsProps = {
  loading: false,
  error: "",
  approvalStatus: "",
  applications: [],
  status: "All",
};

export const fetchApplications = createAsyncThunk(
  "talents/Applications",
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
          return response.data.data;
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

// export const filterApplications = createAsyncThunk(
//   "talents/Applications",
//   async ({ id, status }: { id: string; status: string }) => {
//     const user = localStorage.getItem("userData");
//     try {
//       if (user !== null) {
//         const parsedUser = JSON.parse(user);
//         const response = await campaignAuthAxiosInstance(
//           `/shortlist-filter?project=${id}&status=${status}`,
//           {
//             headers: {
//               Authorization: `Bearer ${parsedUser.authKey}`,
//             },
//           }
//         );
//         console.log(response);

//         return response.data;
//       }
//     } catch (error) {
//       throw error;
//     }
//   }
// );

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
        }
      )
      .addCase(fetchApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failde to fetch publish project";
      });
  },
});

export const { setApproval } = Applications.actions;

export default Applications.reducer;
