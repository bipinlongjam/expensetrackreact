import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Expense from './Expense';
import * as expenseStore from '../../store/expensestore';

// Mocking the expense store module
jest.mock('../../store/expensestore');

describe('Expense Component Tests', () => {
  // Mocked expenses for testing
  const mockedExpenses = [
    { amount: '50', description: 'Test expense', category: 'Food' },
    { amount: '60', description: 'Another expense', category: 'Transportation' }
  ];

  // Mocking the reducer functions
  const mockedAddExpense = jest.fn();
  const mockedEditExpense = jest.fn();
  const mockedDeleteExpense = jest.fn();

  // Provide custom implementation for useDispatch
  jest.spyOn(expenseStore, 'useDispatch').mockReturnValue(jest.fn());

  // Mocking useSelector to return mocked expenses
  jest.spyOn(expenseStore, 'useSelector').mockReturnValue(mockedExpenses);

  // Mocking addExpense, editExpense, and deleteExpense functions
  expenseStore.addExpense.mockImplementation(mockedAddExpense);
  expenseStore.editExpense.mockImplementation(mockedEditExpense);
  expenseStore.deleteExpense.mockImplementation(mockedDeleteExpense);

  // Rendering Test
  it('should render Expense component without crashing', () => {
    render(<Expense />);
  });

  // Form Submission Test
  it('should add an expense when form is submitted with valid data', () => {
    render(<Expense />);
    const amountInput = screen.getByPlaceholderText('Enter amount');
    const descriptionInput = screen.getByPlaceholderText('Enter description');
    const categorySelect = screen.getByLabelText('Category');
    const submitButton = screen.getByText('Submit');

    fireEvent.change(amountInput, { target: { value: '50' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test expense' } });
    fireEvent.change(categorySelect, { target: { value: 'Food' } });
    fireEvent.click(submitButton);

    expect(mockedAddExpense).toHaveBeenCalledWith({ amount: '50', description: 'Test expense', category: 'Food' });
  });

  // Edit Expense Test
  it('should update an expense when edit button is clicked and new values are entered', () => {
    render(<Expense />);
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    const newAmount = '60';
    const newDescription = 'Updated expense';
    const newCategory = 'Transportation';
    // Simulate user input in prompt (mocking prompt behavior)
    global.prompt = jest.fn(() => newAmount);
    global.prompt.mockReturnValueOnce(newDescription);
    global.prompt.mockReturnValueOnce(newCategory);
    
    fireEvent.click(editButton);

    expect(mockedEditExpense).toHaveBeenCalledWith(0, { amount: '60', description: 'Updated expense', category: 'Transportation' });
  });

  // Delete Expense Test
  it('should delete an expense when delete button is clicked and confirmation is accepted', () => {
    render(<Expense />);
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    expect(mockedDeleteExpense).toHaveBeenCalledWith(0);
  });

  // Total Expense Calculation Test
  it('should calculate total expense correctly', () => {
    render(<Expense />);
    const totalExpense = screen.getByText('Total Expense');
    expect(totalExpense).toHaveTextContent('Rs:110.00'); // Assuming totalExpense is calculated correctly
  });

  // Premium Activation Test
  it('should show "Activate Premium" button when total expense exceeds 10000', () => {
    render(<Expense />);
    const submitButton = screen.getByText('Submit');
    const amountInput = screen.getByPlaceholderText('Enter amount');
    fireEvent.change(amountInput, { target: { value: '10001' } });
    fireEvent.click(submitButton);
    const premiumButton = screen.getByText('Activate Premium');
    expect(premiumButton).toBeInTheDocument();
  });

  // Download CSV Test (mocking createObjectURL)
  it('should download a CSV file when "Download File" button is clicked', () => {
    const { getByText } = render(<Expense />);
    const downloadButton = getByText('Download File');
    fireEvent.click(downloadButton);
    // Add your expectations here for downloading CSV
  });

  // Input Validation Test
  it('should display error message when form is submitted without filling in any field', () => {
    render(<Expense />);
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
    expect(screen.getByText('Please fill in all fields.')).toBeInTheDocument();
  });

  // Category Selection Test
  it('should add selected category to expense item', () => {
    render(<Expense />);
    const categorySelect = screen.getByLabelText('Category');
    fireEvent.change(categorySelect, { target: { value: 'Transportation' } });
    const expenseItem = screen.getByText('Transportation');
    expect(expenseItem).toBeInTheDocument();
  });

  // Styling Test
  it('should apply correct styles to elements', () => {
    render(<Expense />);
    const expenseContainer = screen.getByTestId('expense-container');
    expect(expenseContainer).toHaveClass('container');
  });
});
