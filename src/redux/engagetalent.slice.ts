import { TalentProps } from './types';
import { authAxiosInstance, campaignAuthAxiosInstance } from '../api/axios';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface TalentsProps {
  loading: boolean;
  error: string | null;
  message: string;
  talents: any;
  // talents: TalentProps[] | null;

  successfulImport: [];
  failedImport: [];
  count: number;
  prevProducts: string | null;
  nextProducts: string | null;
  prev: string | null;
  next: string | null;
}
const initialState: TalentsProps = {
  loading: false,
  error: '',
  message: '',
  talents: [],

  successfulImport: [],
  failedImport: [],
  count: 0,
  prev: '',
  next: '',
  prevProducts: '',
  nextProducts: '',
};

export const fetchEngageTalents = createAsyncThunk(
  'talents/fetchEngageTalents',
  async () => {
    const user = localStorage.getItem('userData');
    try {
      if (user !== null) {
        const parsedUser = JSON.parse(user);
        console.log('tre', parsedUser.authKey);

        const response = await campaignAuthAxiosInstance(`/engaged-talents`, {
          headers: {
            Authorization: `Bearer ${parsedUser.authKey}`,
          },
        });
        // console.log('cost', user);

        return response.data.data.talentsWhoHaveWorked;
      }
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response Error:', error.response.data);
        throw new Error('Failed to fetch engaged talents. Please try again.');
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request Error:', error.request);
        throw new Error(
          'No response received. Please check your network connection.'
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('General Error:', error.message);
        throw new Error(
          'An unexpected error occurred. Please try again later.'
        );
      }
    }
  }
);

const talents = createSlice({
  name: 'fetchEngageTalents',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.talents = action.payload;
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
      .addCase(fetchEngageTalents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchEngageTalents.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.talents = action.payload.talents;
          state.prev = action.payload.prev;
          state.count = action.payload.count; // Store the count
          state.next = action.payload.next;
        }
      )
      .addCase(
        fetchEngageTalents.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default talents.reducer;
export const { setUser, setSuccessImport, setFailedImport } = talents.actions;
