
import './App.css';
import Signup from './components/forms/Signup';
import SignIn from './components/forms/SignIn';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  {ExpenseProvider}  from './context/auth-context';
import Home from './components/Home/Home';
import ForgotPass from './components/forms/ForgotPass';
import Expense from './components/Expense/Expense';
import { Provider } from 'react-redux';
import store from './store/store';


function App() {
  return (
    <Router>
      <Provider store={store}>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<SignIn />} />
        <Route path='/forgot' element={<ForgotPass/>}/>
        <Route path='/signup' element={<Signup />} />
        <Route path="/expense" element={<Expense/>} />
        </Routes>
    </Provider>
    </Router>
  );
}

export default App;
