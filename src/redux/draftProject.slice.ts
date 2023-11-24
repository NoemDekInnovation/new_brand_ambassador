// import { ProjectProps } from "./types";
// import { campaignAuthAxiosInstance } from "../api/axios";
// import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export interface ActiveProjectsProps {
//     loading: Boolean;
//     error: string | null;
//     draftProject: ProjectProps[];
// }

// const initialState: ActiveProjectsProps = {
//   loading: false,
//   error: "",
//   draftProject: [],
// };

// export const fetchdraftproject = createAsyncThunk(
//   "agency/fetchdraftproject",
//   async () => {
//     const user = localStorage.getItem("userData");

//     try {
//       if (user !== null) {
//         const parsedUser = JSON.parse(user);
//         const response = await campaignAuthAxiosInstance(
//           `/published-projects`,
//           {
//             headers: {
//               Authorization: `Bearer ${parsedUser.authKey}`,
//             },
//           }
//         );
//         // console.log(response.data.data.projects);

//         return response.data.data.projects;
//       }
//     } catch (error) {
//       throw error;
//     }
//   }
// );

// const draftProjects = createSlice({
//   name: "publish",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchpublishproject.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(
//         fetchpublishproject.fulfilled,
//         (state, action: PayloadAction<any>) => {
//           state.loading = false;
//           state.error = null;
//           state.publishProject = action.payload;
//         }
//       )
//       .addCase(fetchpublishproject.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Failde to fetch publish project";
//       });
//   },
// });

// export default publishProjects.reducer;
