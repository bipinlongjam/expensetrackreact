import React, { useEffect, useState } from 'react'
import ExpenseForm from './ExpenseForm'
import classes from './Expense.module.css'
import { json } from 'react-router-dom';

const Expense = () => {
    const [expenses, setExpenses] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editedExpenses, setEditedExpenses] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [dataFetched, setDataFetched] = useState(false);
    

    useEffect(() => {
        fetchExpense();
    },[]); 

    const fetchExpense = async () =>{
        try{
            const response = await fetch(`https://expensereact-c2044-default-rtdb.firebaseio.com/expensedata.json`,{
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
               // const fetchedExpenses = Object.values(data);
               const fetchedExpenses = Object.entries(data).map(([id, expense]) => ({id, ...expense}))
                setExpenses(fetchedExpenses)
                
            }
        } catch(error){
            console.error('Error fetching expense', error)
        }
    }
    const toggleFormVisibility = () => {
        setShowForm(!showForm);
    }
    // const handleEdit = (index) => {
    //     setEditIndex(index);
    // };

    const saveExpense = async (id) => {
        try {
            const response = await fetch(`https://expensereact-c2044-default-rtdb.firebaseio.com/expensedata/${id}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editedExpenses[id])
            });
            if (!response.ok) {
                throw new Error('Failed to edit');
            }
            const updatedExpenses = expenses.map(expense => (expense.id === id ? { ...expense, ...editedExpenses[id] } : expense));
            setExpenses(updatedExpenses);
            setEditedExpenses({});
            setEditIndex(null);
            toggleFormVisibility();
        } catch (error) {
            console.error('Error editing expense', error);
        }
    };

    const editExpense = (id, updatedValues) => {
        setEditedExpenses({ ...editedExpenses, [id]: { ...editedExpenses[id], ...updatedValues } });
    };
    const deleteExpense = async (id) =>{
        try{
            const response = await fetch(`https://expensereact-c2044-default-rtdb.firebaseio.com/expensedata/${id}.json`, {
                method: 'DELETE'
            })
            if(!response.ok){
                throw new Error('Failed to delete expense');
            }
            const updatedExpenses = expenses.filter(expense => expense.id !== id);
            setExpenses(updatedExpenses)
        }catch(error){
            console.error('Error deleting expense', error);
        }
    }
    const handleEdit = (index)=>{
        setEditIndex(index)
    }
  return (
    <div className={classes.container}>
        <ExpenseForm />
        <hr></hr>
        <div className={classes.expense}>
                <h2>Expenses:</h2>
                <ol>    
                    {expenses.map((expense, index) => (
                        <li key={expense.id}>
                            {editIndex === index ? (
                                <div>
                                <input
                                    type="number"
                                    value={editedExpenses[expense.id]?.moneySpent ?? expense.moneySpent}
                                    onChange={(e) => editExpense(expense.id, { moneySpent: e.target.value })}
                                />
                                <input
                                    type="text"
                                    value={editedExpenses[expense.id]?.description ?? expense.description}
                                    onChange={(e) => editExpense(expense.id, { description: e.target.value })}
                                />
                                <input
                                    type="text"
                                    value={editedExpenses[expense.id]?.category ?? expense.category}
                                    onChange={(e) => editExpense(expense.id, { category: e.target.value })}
                                />
                                <button onClick={() => saveExpense(expense.id)}>Save</button>
                                <br />
                            </div>
                            ) :(
                            <div>
                            <strong>Money Spent:</strong> {expense.moneySpent},{' '}
                            <strong>Description:</strong> {expense.description},{' '}
                            <strong>Category:</strong> {expense.category}
                            <br></br>
                            <div>
                            <button onClick={() => handleEdit(index)}>Edit</button>
                            <button onClick={() => deleteExpense(expense.id)}>Delete</button>
                            </div>
                            
                            </div>
                        )} 
                        </li>
                    ))}
                </ol>
            </div>
    </div>
  )
}

export default Expense