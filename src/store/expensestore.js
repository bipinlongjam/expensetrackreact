import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Action creator function for fetching expense data
export const fetchExpense = createAsyncThunk(
    'expense/fetchExpense',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://expensereact-c2044-default-rtdb.firebaseio.com/expensedata.json`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            // Return the fetched data
            return data;
        } catch (error) {
            // Reject with error message
            return rejectWithValue(error.message);
        }
    }
);
// export const fetchExpense = () => async (dispatch) => {
//     dispatch(fetchExpenseStart());
//     try {
//       const response = await fetch('https://expensereact-c2044-default-rtdb.firebaseio.com/expensedata.json');
//       if (!response.ok) {
//         throw new Error('Failed to fetch expenses');
//       }
//       const data = await response.json();
//       console.log("dataaaa", data)
//       dispatch(fetchExpenseSuccess(data));
//     } catch (error) {
//       dispatch(fetchExpenseFailure(error.message));
//     }
//   };
// Define initial state
// const initialState = {
//     loading: false,
//     error: null,
//     expense: []
// };

// // Create a slice for expense data
// const expenseSlice = createSlice({
//     name: 'expense',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchExpense.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchExpense.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.expense = Object.entries(action.payload).map(([id, expense]) => ({ id, ...expense }));
//             })
//             .addCase(fetchExpense.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             });
//     }
// });
export const expenseSlice = createSlice({
    name: 'expense',
    initialState: {
      expense: [],
      loading: false,
      error: null,
    },
    reducers: {
      fetchExpenseStart: (state) => {
        state.loading = true;
        state.error = null;
      },
      fetchExpenseSuccess: (state, action) => {
        state.loading = false;
        state.data = action.payload;
      },
      fetchExpenseFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    },
  });
  
  export const { fetchExpenseStart, fetchExpenseSuccess, fetchExpenseFailure } = expenseSlice.actions;
  
// Export the reducer
export default expenseSlice.reducer;
