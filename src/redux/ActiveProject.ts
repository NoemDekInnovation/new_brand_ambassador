import { ProjectProps } from "./types";
import { campaignAuthAxiosInstance } from "../api/axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";


 export interface ActiveProjectsProps {
   loading: boolean;
   error: string | null;
   activeProject: ProjectProps[];
 }

 const initialState: ActiveProjectsProps = {
   loading: false,
   error: "",
   activeProject: [],
 };

 export const fetchactiveproject = createAsyncThunk(
   "agency/fetchactiveproject",
   async () => {
     const user = localStorage.getItem("userData");

     try {
       if (user !== null) {
         const parsedUser = JSON.parse(user);
         const response = await campaignAuthAxiosInstance(
           `/all-active-projects`,
           {
             headers: {
               Authorization: `Bearer ${parsedUser.authKey}`,
             },
           }
         );
        console.log(response.data,"femi");

         return response.data.projects;
       }
     } catch (error) {
       throw error;
     }
   }
 );

 const activeProjects = createSlice({
   name: "active",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
     builder
       .addCase(fetchactiveproject.pending, (state) => {
         state.loading = true;
         state.error = null;
       })
       .addCase(
         fetchactiveproject.fulfilled,
         (state, action: PayloadAction<any>) => {
           state.loading = false;
           state.error = null;
           state.activeProject = action.payload;
         }
       )
       .addCase(fetchactiveproject.rejected, (state, action) => {
         state.loading = false;
         state.error = action.error.message || "Failde to fetch publish project";
       });
   },
 });

 export default activeProjects.reducer;
