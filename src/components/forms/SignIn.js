import React, { useEffect, useRef } from 'react'
import classes from './SignIn.module.css'
import { useExpense } from '../../context/auth-context';
import { useNavigate, Link } from 'react-router-dom';

const SignIn = () => {
    const {login, token} = useExpense()

    const emailRef = useRef();
    const passwordRef = useRef();

    const navigate = useNavigate()
    
    // useEffect(() =>{
    //     if(token){
    //         navigate('/')
    //     }
    // },[token, navigate])

    const handleSubmit = async (e) => {
    e.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    try {
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCyP3jp2UTlE8HGgaFlvPHeEd4WQkzcQuE`, {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to sign in');
      }

      const data = await response.json();
      console.log('Successfully login', data)
      login(data.idToken);
      navigate('/')
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  };
 

  return (
    <div className={classes.container}>
    <h2>Sign In</h2>
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
      <button type="submit">
        Sign In
      </button>
    </form>
    <p>Don't have an account? <Link to="/signup">Sign Up</Link></p> {/* Link to the sign-up page */}
    <Link to="/forgot">Forgot Password?</Link>
  </div>
  )
}

export default SignIn