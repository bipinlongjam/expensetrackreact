import React, { useRef } from 'react'
import classes from './ExpenseForm.module.css'

const ExpenseForm = ({addExpense}) => {

    const moneySpentRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();

    const handleSubmit =(e)=>{
        e.preventDefault();
        const moneySpent = moneySpentRef.current.value;
        const description = descriptionRef.current.value;
        const category = categoryRef.current.value;
        if (!moneySpent || !description || !category) {
            // Do some error handling (e.g., display an error message)
            return;
        }
        addExpense({
            moneySpent,
            description,
            category
        });
        // Clear the form fields after submitting
        moneySpentRef.current.value = '';
        descriptionRef.current.value = '';
        categoryRef.current.value = '';
       
    }
  return (
    <div className={classes.container}>
        <h2>Add Daily Expense:</h2>
        <div>
        </div>
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
        </form>
    </div>
  )
}

export default ExpenseForm