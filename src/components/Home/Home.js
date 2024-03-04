import React, { useRef, useState, useEffect} from 'react'
import classes from './Home.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useExpense } from '../../context/auth-context'



const Home = () => {
   
    const{logout, token} = useExpense()
    const [showForm, setShowForm] = useState(false);
    const fullnameRef = useRef();
    const profileurlRef = useRef();
    const [formData, setFormData] = useState({
        fullname: '',
        profilePhotoUrl: ''
    });
    const navigate =  useNavigate();

    const handleCompleteNow=()=>{
        setShowForm(true)
    }
    
    //Cancel update
    const handleCancel = () => {
        setShowForm(false); // Set showForm to false to hide the form
    };

    const handleLogout = () => {
        logout();
    };
   

    //Fetch data from firebase

    const fetchUserProfileData = async (idToken) => {
        try {
            const response = await fetch(`https://expensereact-c2044-default-rtdb.firebaseio.com/expense.json?auth=${idToken}`);
            if (!response.ok) {
                throw new Error('Failed to fetch profile data');
            }
            const data = await response.json();
            const firstKey = Object.keys(data)[0];
            const userData = data[firstKey];
            return userData;
        } catch (error) {
            console.error('Error fetching profile data:', error.message);
            throw error; // Re-throw the error for the caller to handle
        }
    };

    useEffect(() => {
        if (!token) {
            // If the user is logged out, redirect to the login page
            navigate('/login')
        }else{
            fetchUserProfileData(token)
            .then((data) =>{
                if(data){
                    setFormData(data)
                }
            })
            .catch((error) =>{
                console.error('Error fetching profile data', error)
            })
        }
    }, [token, navigate]);


    const handleSubmit = async (e) =>{
        e.preventDefault();
        const formData = {
            fullname :fullnameRef.current.value,
            profilePhotoUrl: profileurlRef.current.value
        }
        console.log('Form submitted:', formData);
        try{
           
            const response = await fetch(` https://expensereact-c2044-default-rtdb.firebaseio.com/expense.json`,{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify(formData)
            });
            if(!response.ok){
                throw new Error('Failed to submit form')
            }
            console.log('Successfully submitted');
            fullnameRef.current.value = '';
            profileurlRef.current.value = '';
        }catch(error){
            console.log('Error submitting form', error.message);
        }
    }
  return (
<div className={classes.container}>
    <div className={classes.header}>
    <div >
        <h2>
         Welcome to Expense Tracker
        </h2>
    </div>
    <div className={classes.profile}> 
    {formData.fullname && formData.profilePhotoUrl ?
    (<p>Your Profile is Incomplete</p>) : (
        <p>Your Profile is Incomplete</p>
    )}
    <div className={classes.headbtn}>
    <span><button onClick={handleCompleteNow}>Complete now</button></span>
    <span><button className={classes.logbtn} onClick={handleLogout}>Logout</button></span>
    </div>
    </div>
    </div>
    <hr></hr>
      {
        showForm && (
            <div>
                <h2>Contact Details:</h2>
            <form className={`${classes.form}`} onSubmit={handleSubmit}>
            <div className={classes.details}>
                <label>Fullname:</label>
                <input type="text" ref={fullnameRef} defaultValue={formData.fullname} />
                <label>Profile Photo URL:</label>
                <input type="text" ref={profileurlRef} defaultValue={formData.profilePhotoUrl}/>
            </div>
            <div className={classes.btn}>   
            <button type="button" onClick={handleCancel}>Cancel</button>
            <button type="submit">Update</button>
            </div>
        </form>
        </div>
        )
      }
    </div>
  )
}

export default Home