import React, { useRef } from 'react'
import classes from './ForgotPass.module.css'
import { Link } from 'react-router-dom'

const ForgotPass = () => {
    const emailRef = useRef()

    const sendPasswordReset = async(email) =>{
        const apiKey = 'AIzaSyCyP3jp2UTlE8HGgaFlvPHeEd4WQkzcQuE';
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`
        try{
            const response = await fetch(url,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    email,
                    requestType: 'PASSWORD_RESET',
                })
            })
            if(!response.ok){
                throw new Error('Failed to send password reset email');
            }
            
        } catch(error){
            console.error('Error sending password reset email', error.message);
        }
    }
    const handleSubmit =(e)=>{
        e.preventDefault();
        const enteredEmail = emailRef.current.value;
        sendPasswordReset(enteredEmail)
    }
  return (
    <div className={classes.container}>
            <p> Enter the email which you have registered</p>
            <form onSubmit={handleSubmit}>
            <input type="email" ref={emailRef} required placeholder='Enter your email'/>
            <button type='submit' className={classes.action}>Send Link</button>
        </form>
        <p>Already have an account? <Link to="/login">Sign In</Link></p>
    </div>
  )
}

export default ForgotPass