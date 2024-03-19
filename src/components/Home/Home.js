import React, { useRef, useState, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import classes from './Home.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useExpense } from '../../context/auth-context'
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { logoutStart, logoutSuccess, logoutFailure } from '../../store/logoutAuth'
import Expense from '../Expense/Expense';
import { toggleTheme } from '../../store/expensestore';
import {expenseReducer} from '../../store/expensestore'



const Home = () => {
   
    const dispatch = useDispatch();
    const {token} = useSelector(state => state.auth)
    const [showModal, setShowModal] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const fullnameRef = useRef();
    const profileurlRef = useRef();
    const [formData, setFormData] = useState({
        fullname: '',
        profilePhotoUrl: ''
    });
    const [isFormEdited, setIsFormEdited] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const navigate =  useNavigate();

   const darkTheme = useSelector(state => state.expense.darkTheme);

   const toggleThemeHandler = () => {
    // setDarkMode(prevDarkMode => !prevDarkMode);
    dispatch(toggleTheme());
};

    
    const handleCompleteNow = () => {
        setShowModal(true);
      };
    
      const handleClose = () => {
        setShowModal(false);
      };
    

    const handleLogout = () => {
        dispatch(logoutStart()); // Dispatch logout start action
        // You can also navigate to the login page here if needed
        // navigate('/login');
        setTimeout(() => {
          // Simulating async logout process
          dispatch(logoutSuccess()); // Dispatch logout success action
          navigate('/login');
        }, 1000);
      };

    //Fetch data from firebase

    const fetchUserProfileData = async (idToken) => {
        try {
            const response = await fetch(`https://expensereact-c2044-default-rtdb.firebaseio.com/expense.json?auth=${idToken}`);
            if (!response.ok) {
                throw new Error('Failed to fetch profile data');
            }
            const data = await response.json();
            console.log('Fetched user data:', data);
            const firstKey = Object.keys(data).pop();
            console.log('First key:', firstKey);
            const userData = data[firstKey];
            console.log('User data:', userData);
            console.log('token id',idToken)
            return userData;
        } catch (error) {
            console.error('Error fetching profile data:', error.message);
            throw error;
        }
    };

    useEffect(() => {
        if (!token) {
            console.log('User token not found, redirecting to login page');
        } else {
            fetchUserProfileData(token)
                .then((data) => {
                    if (data) {
                        setFormData(data);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching profile data:', error);
                });
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
            setShowModal(false)
        }catch(error){
            console.log('Error submitting form', error.message);
        }
    }

    const handleInputChange = () => {
        setIsFormEdited(true); // Set form as edited when any input field changes
    };
  return (
<div>
<div className={`${classes.container} ${darkTheme ? classes.darkBackground : ''}`}>
    <div className={classes.header}>
        <div >
        <h2 className={classes.heading}>
         Welcome to Expense Tracker
        </h2>
    </div>
    <div className={classes.profile}> 
    {/* <p>Your profile is Incomplete</p>
    <span><button onClick={handleCompleteNow} style={{ fontSize: '14px', padding: '5px 10px', marginTop:'30px' }}>Complete now</button></span> */}
   
    <div className={classes.headbtn}>
    <span><button onClick={verifyEmail} style={{ fontSize: '14px', padding: '5px 10px' }}>{!isVerified ? 'Verify Email' : 'Verified' }</button></span>
    </div>
   
    </div>
    <div>
        <span className={classes.name}>{formData.fullname && formData.fullname.split(' ')[0]}
        </span>
    <button className={classes.logbtn} onClick={handleLogout} style={{ fontSize: '14px', padding: '5px 10px', marginTop:'30px', marginRight:"10px"}}>Logout</button>
    <span><button onClick={toggleThemeHandler} style={{ fontSize: '14px', padding: '5px 10px', marginTop:'30px' }}>
    {/* {darkMode ? 'Light Mode' : 'Dark Mode'} */}
    DarkMode
     </button></span>
    </div>
    {showModal && (
        <Modal show={showModal} onHide={handleClose} 
        style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px' }}>
            <Modal.Title style={{fontFamily:'fantasy', marginBottom:'10px'}}>Contact Details</Modal.Title>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="fullname">
                <Form.Label>Fullname:</Form.Label>
                <br></br>
                <Form.Control
                  type="text"
                  ref={fullnameRef}
                  defaultValue={formData.fullname} 
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="profilePhotoUrl">
                <Form.Label>Profile Photo URL:</Form.Label>
                <Form.Control
                  type="text"
                  ref={profileurlRef} 
                  defaultValue={formData.profilePhotoUrl} 
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button style={{width:'100px', marginBottom:'10px', marginLeft:'40px'}} variant="secondary" onClick={handleClose}>
                Cancel
              </Button>

              <Button style={{width:'100px', marginLeft:'40px'}} variant="primary" type="submit">
                Update
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </div>
        <Expense />
    </div>
   
     </div>
  )
}

export default Home