
  // expenseReducer.js

// expenseStore.js

// expenseReducer.js

const ADD_EXPENSE = 'ADD_EXPENSE';
const EDIT_EXPENSE = 'EDIT_EXPENSE';
const DELETE_EXPENSE = 'DELETE_EXPENSE';

// const initialState = {
//   expenses: []
// };
const initialState = {
  expenses: JSON.parse(localStorage.getItem('expenses')) || [], // Initialize expenses from localStorage or as an empty array
};

const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      const newExpenses = [...state.expenses, action.payload];
      localStorage.setItem('expenses', JSON.stringify(newExpenses)); 

      return {
        ...state,
        expenses: newExpenses
      };
      case 'EDIT_EXPENSE':
        const editedExpenses = state.expenses.map((expense, index) =>{
          if(index === action.payload.index){
            return action.payload.expense;
          }
        })
        localStorage.setItem('expenses', JSON.stringify(editedExpenses));
        return{
          ...state,
          expenses: editedExpenses,
        }
      case 'DELETE_EXPENSE':
        const deleteExpenses = state.expenses.filter((expense, index) => index !== action.payload);
        localStorage.setItem('expense', JSON.stringify(deleteExpenses));
        return {
          ...state,
          expenses: deleteExpenses,
        }
    default:
      return state;
  }
};


export const addExpense = (expense) => {
  return {
    type: ADD_EXPENSE,
    payload: expense
  };
};
export const editExpense = (index, expense) => {
  return {
    type: EDIT_EXPENSE,
    payload: { index, expense },
  };
};

export const deleteExpense = (index) => {
  return {
    type: DELETE_EXPENSE,
    payload: index,
  };
};
export default expenseReducer;


// Expenses Reducer

// const expensesReducerDefaultState = [];

// export default (state = expensesReducerDefaultState, action) => {
//   switch (action.type) {
//     case 'ADD_EXPENSE':
//       return [
//         ...state,
//         action.expense
//       ];
//     case 'REMOVE_EXPENSE':
//       return state.filter(({ id }) => id !== action.id);
//     case 'EDIT_EXPENSE':
//       return state.map((expense) => {
//         if (expense.id === action.id) {
//             return {
//               ...expense,
//               ...action.updates
//             }
//         } else {
//             return expense;
//         }
//       });
//       case 'SET_EXPENSE':
//         return action.expenses;
//     default:
//       return state;
      
//   }
// };