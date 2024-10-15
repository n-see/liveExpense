import CreateAccount from "./expense-tracker/components/CreateAccount";
import ExpenseList from "./expense-tracker/components/ExpenseList"
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from "./expense-tracker/components/Navbar";
import Login from "./expense-tracker/components/Login";
import { useState } from "react";
export interface User{
  id: number,
  username: string;
  password: string;
}

const App = () => {

    const[user, setUser] = useState({
    publisherName: ""
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = (userData:{publisherName: string}) => {
    setUser(userData)
    setIsLoggedIn(true);
    console.log(userData);
  }
  const handleLogout = () => {
    localStorage.clear();
    setUser({
      publisherName: ""
    });
    setIsLoggedIn(false);
}


  return (
    <>
    <BrowserRouter>
    <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={() => setIsLoggedIn} user={user}  handleLogout={handleLogout}/>
    <h1 className="text-center">Expense Tracker</h1>
      <div className="m-5">
      <Routes>
      <Route path="/ExpenseList" element={<ExpenseList onLogin={handleLogin}/>} />
      <Route path="/CreateAccount" element={<CreateAccount/>} />
      <Route path="/" element={<Login/>} />
      </Routes>
      </div>
    </BrowserRouter>
    </>
  )
}

export default App