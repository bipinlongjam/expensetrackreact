import React, { useRef, useState} from 'react'
import classes from './ExpenseForm.module.css'
import { useSelector } from 'react-redux';

const ExpenseForm = () => {
    const [showPremiumButton, setShowPremiumButton] = useState(false);
    const moneySpentRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();

    //const expenses = useSelector((state) => state.expense.data);
    //const generateUniqueId = () => Math.random().toString(36).substring(2, 8) + Date.now();

    const addHandler = async (expenseData) =>{
        try{
            const response = await fetch(`https://expensereact-c2044-default-rtdb.firebaseio.com/expensedata.json`,{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(expenseData)
            })
            const data = await response.json();
            console.log('successfully added data', data);
        } catch(error){
            console.error("eror adding data", error);
        }
    }


    const handleSubmit = async (e)=>{
        e.preventDefault();
        const moneySpent = moneySpentRef.current.value;
        const description = descriptionRef.current.value;
        const category = categoryRef.current.value;
       
       
        // Clear the form fields after submitting
        moneySpentRef.current.value = '';
        descriptionRef.current.value = '';
        categoryRef.current.value = '';
       
    }
    const calculateTotalExpenses = () => {
        // Your logic to calculate total expenses
        // let totalExpenses = 0;
        // expenses.forEach(expense => {
        //     totalExpenses += parseFloat(expense.moneySpent); // Assuming moneySpent is a string, parse it to a float
        // });
        // return totalExpenses;
    }
  return (
    <div className={classes.container}>
        <h2>Add Daily Expense:</h2>
        <form onSubmit={handleSubmit} className={classes.formContainer}>
            <div>
                <h4>Money Spent</h4>
                <input type="number" ref={moneySpentRef} required/>
            </div>
            <div>
            <h4>Description</h4>
            <input type="text" ref={descriptionRef} required />
            </div>
            <div>
                <label>Category:</label>
                    <select ref={categoryRef} required>
                        <option value="">Select Category</option>
                        <option value="Food">Food</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Salary">Salary</option>
                        {/* Add more options as needed */}
                    </select>
            </div>
                <button type="submit" className={classes.action}>Add Expense</button>
                {showPremiumButton && <button className={classes.premiumButton}>Activate Premium</button>}
        </form>
    </div>
  )
}

export default ExpenseForm