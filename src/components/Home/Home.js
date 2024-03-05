import React, { useRef, useState, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import classes from './Home.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useExpense } from '../../context/auth-context'
import Expense from '../Expense/Expense';



const Home = () => {
   
    const{logout, token, user} = useExpense()
    const [showForm, setShowForm] = useState(false);
    const fullnameRef = useRef();
    const profileurlRef = useRef();
    const [formData, setFormData] = useState({
        fullname: '',
        profilePhotoUrl: ''
    });
    const [isFormEdited, setIsFormEdited] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const navigate =  useNavigate();

    const handleCompleteNow=()=>{
        setShowForm(!showForm)
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
            const firstKey = Object.keys(data).pop();
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

    const verifyEmail = async () => {
        try {
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCyP3jp2UTlE8HGgaFlvPHeEd4WQkzcQuE`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    requestType: 'VERIFY_EMAIL',
                    idToken: token,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to send email verification');
            }

            console.log('Email verification sent successfully');
            setIsVerified(true)
        } catch (error) {
            console.error('Error sending email verification:', error.message);
        }
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const customId = uuidv4();
        const formData = {
            id:customId,
            fullname :fullnameRef.current.value,
            profilePhotoUrl: profileurlRef.current.value
        }
        console.log('Form submitted:', formData);
        try{
            let method = 'POST'; // default to POST method
            let url = `https://expensereact-c2044-default-rtdb.firebaseio.com/expense.json?auth=${token}`;
            //Check if form data is already exists in Firebase
            if(formData && formData.id){
                // If form data exists, use PUT method to update
                method = 'PUT';
                url = `https://expensereact-c2044-default-rtdb.firebaseio.com/expense/${formData.id}.json?auth=${token}`;
            }
            const response = await fetch(url, {
                method:method,
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify(formData)
            });
            if(!response.ok){
                throw new Error(`Failed to ${method === 'POST' ? 'create' : 'update'} form data`);
                
            }
            console.log(`Successfully ${method === 'POST' ? 'created' : 'updated'}`);
            fullnameRef.current.value = '';
            profileurlRef.current.value = '';
            setIsFormEdited(false); // Reset form editing state
        }catch(error){
            console.log('Error submitting form', error.message);
        }
    }

    const handleInputChange = () => {
        setIsFormEdited(true); // Set form as edited when any input field changes
    };
  return (
<div className={classes.container}>
    <div className={classes.header}>
    <div >
        <h2>
         Welcome to Expense Tracker
        </h2>
    </div>
    <div className={classes.profile}> 
    <p>Your profile is Incomplete</p>
    <span><button onClick={handleCompleteNow} style={{ fontSize: '14px', padding: '5px 10px', marginTop:'30px' }}>Complete now</button></span>
    <div className={classes.headbtn}>
    <span><button onClick={verifyEmail} style={{ fontSize: '14px', padding: '5px 10px' }}>{!isVerified ? 'Verify Email' : 'Verified' }</button></span>
    </div>
    <span><button className={classes.logbtn} onClick={handleLogout} style={{ fontSize: '14px', padding: '5px 10px', marginTop:'30px' }}>Logout</button></span>
    </div>
    </div>
    <hr />
   
    <div className={classes.containerDetails}>
        <div  className={classes['left-half']}>
        <Expense />
        </div>
        <div className={classes['right-half']}>
        {
        showForm && (
            <div>
            <h2 className={classes.formHeading}>Contact Details:</h2>
            <form className={classes.form} onSubmit={handleSubmit}>
            <div className={classes.details}>
                <label>Fullname:</label>
                <input type="text" ref={fullnameRef} defaultValue={formData.fullname} onChange={handleInputChange}/>
                <label>Profile Photo URL:</label>
                <input type="text" ref={profileurlRef} defaultValue={formData.profilePhotoUrl} onChange={handleInputChange}/>
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
    </div>
     
    </div>
   
  )
}

export default Home