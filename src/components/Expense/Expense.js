import React, { useState } from 'react'
import ExpenseForm from './ExpenseForm'
import classes from './Expense.module.css'

const Expense = () => {
    const [expenses, setExpenses] = useState([]);

    const addExpense =(expense) =>{
        setExpenses([...expenses, expense])
    }
    console.log('expenses',expenses)
  return (
    <div className={classes.container}>
        <ExpenseForm addExpense={addExpense}/>
        <hr></hr>
        <div className={classes.expense}>
                <h2>Expenses:</h2>
                <ol>
                    {expenses.map((expense, index) => (
                        <li key={index}>
                            <strong>Money Spent:</strong> {expense.moneySpent},{' '}
                            <strong>Description:</strong> {expense.description},{' '}
                            <strong>Category:</strong> {expense.category}
                        </li>
                    ))}
                </ol>
            </div>
    </div>
  )
}

export default Expense