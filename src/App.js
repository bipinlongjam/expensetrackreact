
import './App.css';
import Signup from './components/forms/Signup';
import SignIn from './components/forms/SignIn';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  {ExpenseProvider}  from './context/auth-context';
import Home from './components/Home/Home';
import ForgotPass from './components/forms/ForgotPass';

function App() {
  return (
    <Router>
     <ExpenseProvider>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<SignIn />} />
        <Route path='/forgot' element={<ForgotPass/>}/>
        <Route path='/signup' element={<Signup />} />
        </Routes>
        </ExpenseProvider>
    </Router>
  );
}

export default App;
