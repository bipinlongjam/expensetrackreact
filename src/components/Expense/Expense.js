import React, { useState, useRef, useEffect, useReducer } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import classes from './Expense.module.css'
import { useDispatch, useSelector } from 'react-redux';
import {addExpense, editExpense, deleteExpense} from '../../store/expensestore'
import expenseReducer from '../../store/expensestore';


const Expense = ({className}) => {
const [editIndex, setEditIndex] = useState(null);
  const amountRef = useRef(null);
  const descriptionRef = useRef(null);
  const categoryRef = useRef(null);

 
  const dispatch = useDispatch();
  const expenses = useSelector(state => state.expense.expenses);
  
  //const totalExpense = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
  const totalExpense = useSelector(state => {
    const expenses = state.expense?.expenses; // Using optional chaining to handle undefined state.expense
    return expenses ? expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0) : 0; // Returning 0 if expenses is undefined
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    // Accessing form field values using refs
    const amount = amountRef.current.value;
    const description = descriptionRef.current.value;
    const category = categoryRef.current.value;
     
    
    if (amount && description && category) {
        dispatch(addExpense({ amount, description, category }));
        amountRef.current.value = '';
        descriptionRef.current.value = '';
        categoryRef.current.value = '';
      }
    
  };
 
  const handleEdit = (index) => {
    const amount = prompt('Enter new amount:');
    const description = prompt('Enter new description:');
    const category = prompt('Enter new category:');

    if (amount !== null && description !== null && category !== null) {
      dispatch(editExpense(index, { amount, description, category }));
    }
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      dispatch(deleteExpense(index));
    }
  };

  const downloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      expenses.map(expense => Object.values(expense).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
  };
  return (
    <div className={`${classes.container} ${className}`} >
        <div className={classes.expenseadd}>
     <Form onSubmit={handleSubmit}>
        <Form.Group controlId="amount">
          <Form.Label>Amount Spent</Form.Label>
          <br></br>
          <Form.Control
            type="number"
            placeholder="Enter amount"
            ref={amountRef}
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <br></br>
          <Form.Control
            type="text"
            placeholder="Enter description"
            ref={descriptionRef}
          />
        </Form.Group>
        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <br></br>
          <Form.Control as="select" ref={categoryRef}>
            <option value="">Select category</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Housing">Housing</option>
            <option value="Entertainment">Entertainment</option>
            {/* Add more categories as needed */}
          </Form.Control>
        </Form.Group>
        <br></br>
        <Button variant="primary" type="submit" size="sm" 
         className={`${classes.submitButton} ${totalExpense > 10000 ? classes.disabledButton : ''}`}
        disabled={totalExpense > 10000}>
             Submit
          </Button>
        {totalExpense > 10000 && (
            <Button variant="info" className={classes.activatePremiumButton}>
              Activate Premium
            </Button>
          )}
        </Form>
        </div>
      <ListGroup  className={`${classes.expenselist}`}>
        <div className={classes.expenseshow}>
        <div className={classes.list}>
        <h2>Expenses List</h2>
        {expenses && expenses.map((expense, index) => (
            <ListGroup.Item key={index} className={`${classes.lightBorder} ${classes.listItem}`}>
              <p><strong>Amount:</strong> {expense.amount}</p>
              <p><strong>Description:</strong> {expense.description}</p> 
              <strong>Category:</strong> {expense.category}
              <div className={classes.buttonContainer}>
                <Button variant="outline-primary" onClick={() => handleEdit(index)}>Edit</Button>{' '}
                 <Button variant="outline-danger" onClick={() => handleDelete(index)}>Delete</Button>
                </div>
            </ListGroup.Item>
          ))}
            </div>
            <div className={classes.total}>
                <div className={classes.totalAmount}>
                    <h2>Total Expense</h2>
                    <p>Rs:{totalExpense.toFixed(2)}</p>
                </div>
                <div className={classes.download}>
                    <Button variant="success" onClick={downloadCSV}>Download File</Button>
                </div>
            </div>
          </div>
          
      </ListGroup>
    </div>
  );
};

export default Expense;
