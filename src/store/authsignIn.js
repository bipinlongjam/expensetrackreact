import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const loginUser = createAsyncThunk(
  'loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCyP3jp2UTlE8HGgaFlvPHeEd4WQkzcQuE`, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to sign in');
      }

      const data = await response.json();
      console.log('Successfully logged in', data);
      return data.idToken;
    } catch (error) {
      console.error('Error signing in:', error.message);
      return rejectWithValue(error.message);
    }
  }
)


const authSlice = createSlice({
    name: 'user',
    initialState:{
        loading:false,
        user:null,
        token:'',
        error:null
    },
    reducers:{},
    extraReducers: (builder) => {
      builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      }
});

// Async action for login


export default authSlice.reducer;
