import { createSlice } from "@reduxjs/toolkit";

const logoutSlice = createSlice({
  name: 'logout',
  initialState: {
    loading: false,
    error: null
  },
  reducers: {
    // Add reducers specific to logout actions here
    logoutStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    logoutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

// Export the slice reducer
export const { logoutStart, logoutSuccess, logoutFailure } = logoutSlice.actions;
export default logoutSlice.reducer;
