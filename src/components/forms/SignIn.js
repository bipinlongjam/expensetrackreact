import React, { useEffect, useRef } from 'react'
import classes from './SignIn.module.css'
import { useExpense } from '../../context/auth-context';
import { useNavigate, Link } from 'react-router-dom';
import {loginUser} from '../../store/authsignIn'
import { useDispatch, useSelector } from 'react-redux';

const SignIn = () => {
   // const {login, token} = useExpense()
    const dispatch = useDispatch()

    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate()

  const userId = useSelector(state => state.auth.userId);
  console.log("user id",userId)
  const handleSubmit = async(e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try{
      await dispatch(loginUser({email, password}));
      navigate('/')
    }catch(error){
      console.error('Login Failed', error.message);
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