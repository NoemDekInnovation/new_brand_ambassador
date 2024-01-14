import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface USERProps {
  firstName: string;
  role: string;
  accountId: string;
  authKey: string;
  agencyName: string;
  companyLogo: string;
  profilePic: string;
  userId: string;
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
    : {
        firstName: "",
        role: "",
        accountId: "",
        companyLogo: "",
        profilePic: "",
        userId: "",
      },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<USERProps>) => {
      state.user = action.payload;

      localStorage.setItem(localStorageKey, JSON.stringify(action.payload));
    },

    logout: (state, action) => {
      state.user = {
        firstName: "",
        role: "",
        accountId: "",
        authKey: "",
        agencyName: "",
        companyLogo: "",
        profilePic: "",
        userId: "",
      };

      localStorage.removeItem(localStorageKey);
      localStorage.clear();
    },
  },
});

export default userSlice.reducer;
export const { setUser, logout } = userSlice.actions;
