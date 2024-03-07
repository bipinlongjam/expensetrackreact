import React, { useRef, useState } from 'react'
import classes from './SignUp.module.css'
//import { useExpense } from '../../context/auth-context';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
     
      const enteredEmail = emailRef.current.value
      const enteredPassword = passwordRef.current.value
      const enteredConfirmPassword = confirmPasswordRef.current.value

      if (enteredPassword !== enteredConfirmPassword) {
        console.log('Passwords do not match');
        return;
        }   
        
        try{
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCyP3jp2UTlE8HGgaFlvPHeEd4WQkzcQuE`,{
                method:'POST',
                body:JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true
                }),
                headers:{
                    'Content-type':'application/json'
                }
            });

            if(!response.ok){
                throw new Error('Failed to submit form')
            }
            console.log('Successfully submitted');
            emailRef.current.value = '';
            passwordRef.current.value = '';
            confirmPasswordRef.current.value = '';
            navigate('/')
        }catch(error){
            console.log('Error submitting form', error.message);
        }
    }
  return (
    <div className={classes.container}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          ref={emailRef}
          required
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          ref={passwordRef}
          required
        />
        <br />
        <label>Confirm Password:</label>
        <input
          type="password"
          ref={confirmPasswordRef}
          required
        />
        <br />
        <button type="submit">
          Sign Up
        </button>
      </form>
      <p>Already have an account? <Link to="/login">Sign In</Link></p> {/* Link to the sign-in page */}
    </div>
  )
}

export default Signup