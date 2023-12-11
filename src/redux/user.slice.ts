import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface USERProps {
  firstName: string;
  role: string;
  accountId: string;
  authKey: string;
  agencyName: string;
  profilePic: string;
}

export interface userProps {
  loading: boolean;
  error: string;
  message: string;
  user: USERProps | null;
}

const localStorageKey = "userData"; 

const storedUserData = localStorage.getItem(localStorageKey);

const initialState: userProps = {
  loading: false,
  error: "",
  message: "",
  // user: { firstName: "", role: "", accountId: "" },
  user: storedUserData
    ? JSON.parse(storedUserData)
    : { firstName: "", role: "", accountId: "" },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // setUser: (state, action) => {
    //   state.user = action.payload;
    // },
    setUser: (state, action: PayloadAction<USERProps>) => {
      state.user = action.payload;

      localStorage.setItem(localStorageKey, JSON.stringify(action.payload));
    },

    // logout: (state, action) => {
    //   state.user = null;
    // },
    logout: (state, action) => {
      state.user = {
        firstName: "",
        role: "",
        accountId: "",
        authKey: "",
        agencyName: "",
        profilePic: "",
      };

      localStorage.removeItem(localStorageKey);
    },
  },
});

export default userSlice.reducer;
export const { setUser, logout } = userSlice.actions;
