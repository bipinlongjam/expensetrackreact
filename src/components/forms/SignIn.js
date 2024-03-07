import React, { useEffect, useRef } from 'react'
import classes from './SignIn.module.css'
import { useExpense } from '../../context/auth-context';
import { useNavigate, Link } from 'react-router-dom';
import {loginUser} from '../../store/authsignIn'
import { useDispatch } from 'react-redux';

const SignIn = () => {
   // const {login, token} = useExpense()
    const dispatch = useDispatch()

    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate()

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;

        dispatch(loginUser({ email: enteredEmail, password: enteredPassword }))
            .then((resultAction) => {
                if (loginUser.fulfilled.match(resultAction)) {
                    const token = resultAction.payload.idToken;
                    console.log('User token:', token);
                    navigate('/'); // Navigate to the home page after successful login
                } else {
                    console.error('Failed to log in:', resultAction.payload);
                    // Handle login failure
                }
            });
    }
    
    

//     const handleSubmit = async (e) => {
//     e.preventDefault();
//     const enteredEmail = emailRef.current.value;
//     const enteredPassword = passwordRef.current.value;
//     try {
//       const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCyP3jp2UTlE8HGgaFlvPHeEd4WQkzcQuE`, {
//         method: 'POST',
//         body: JSON.stringify({
//           email: enteredEmail,
//           password: enteredPassword,
//           returnSecureToken: true
//         }),
//         headers: {
//           'Content-type': 'application/json'
//         }
//       });

//       if (!response.ok) {
//         throw new Error('Failed to sign in');
//       }

//       const data = await response.json();
//       console.log('Successfully login', data)
//       login(data.idToken);
//       navigate('/')
//     } catch (error) {
//       console.error('Error signing in:', error.message);
//     }
//   };
 

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