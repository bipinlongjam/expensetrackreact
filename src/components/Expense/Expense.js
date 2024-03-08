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
  

  const handleSubmit = (event) => {
    event.preventDefault();
    // Accessing form field values using refs
    const amount = amountRef.current ? amountRef.current.value : '';
    const description = descriptionRef.current ? descriptionRef.current.value : '';
    const category = categoryRef.current ? categoryRef.current.value : '';
    
    if (amount && description && category) {
        if(editIndex !== null){
            dispatch(editExpense(editIndex, {amount, description, category}))
            setEditIndex(null)
        }else{
            dispatch(addExpense({ amount, description, category }));
        }
      if (amountRef.current) amountRef.current.value = '';
      if (descriptionRef.current) descriptionRef.current.value = '';
      if (categoryRef.current) categoryRef.current.value = '';
      }
    
  };
 
  const handleEdit = (index) => {
    setEditIndex(index);
    const {amount, description, category} = expenses[index]
    if (amountRef.current) amountRef.current.value = amount;
    if (descriptionRef.current) descriptionRef.current.value = description;
    if (categoryRef.current) categoryRef.current.value = category;

    // if (amount !== null && description !== null && category !== null) {
    //   dispatch(editExpense(index, { amount, description, category }));
    // }
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      dispatch(deleteExpense(index));
    }
  };

  return (
    <div className={`${classes.container} ${className}`}>
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
        <Button variant="primary" type="submit" size="sm" className={classes.submitButton}>
            Submit
        </Button>
        </Form>
     

      <ListGroup  className={`${classes.expenselist}`}>
        <h2>Expenses List</h2>
        {expenses.map((expense, index) => (
          <ListGroup.Item key={index} className={classes.lightBorder}>
            {editIndex === index ? (
              <Form onSubmit={handleSubmit}>
                <Form.Control type="number" defaultValue={expense.amount} ref={amountRef} />
                <Form.Control type="text" defaultValue={expense.description} ref={descriptionRef} />
                <Form.Control as="select" defaultValue={expense.category} ref={categoryRef}>
                  <option value="Food">Food</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Housing">Housing</option>
                  <option value="Entertainment">Entertainment</option>
                </Form.Control>
                <div className={classes.buttonContainer}>
                <Button variant="primary" type="submit">Save</Button>
                <Button variant="secondary" onClick={() => setEditIndex(null)}>Cancel</Button>
                </div>
              </Form>
            ) : (
              <>
                <p><strong>Amount:</strong> {expense.amount}</p>
                <p><strong>Description:</strong> {expense.description}</p>
                <p><strong>Category:</strong> {expense.category}</p>
                <div className={classes.buttonContainer}>
                  <Button variant="outline-primary" onClick={() => handleEdit(index)}>Edit</Button>{' '}
                  <Button variant="outline-danger" onClick={() => handleDelete(index)}>Delete</Button>
                </div>
              </>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Expense;
