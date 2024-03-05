import React, { useEffect, useState } from 'react'
import ExpenseForm from './ExpenseForm'
import classes from './Expense.module.css'

const Expense = () => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() =>{
        fetchExpense();
    },[])
    const fetchExpense = async () =>{
        try{
            const response = await fetch('https://expensereact-c2044-default-rtdb.firebaseio.com/expensedata.json',{
                method:'GET',
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            if(!response.ok){
                throw new Error('Failed to fetch data')
            }
            const data = await response.json();
            if(data){
                const fetchedExpenses = Object.values(data);
                setExpenses(fetchedExpenses)
            }
        } catch(error){
            console.error('Error fetching expense', error)
        }
    }

  return (
    <div className={classes.container}>
        <ExpenseForm />
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