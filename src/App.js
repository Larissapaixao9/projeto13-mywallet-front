import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Cashin from './components/Cashin'
import CashOut from'./components/CashOut'
import UserContext from './contexts/UserCoontext'
function App() {
  const [token, setToken] = React.useState(localStorage.getItem('token'));
  const config={
    headers:{
      "Authorization": `Bearer ${token}`
    }
  }
  const [userData, setUserdata] = React.useState(null);
  return (
    <UserContext.Provider value={{token, setToken, userData, setUserdata,config}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/home" element={<Home />} />
        <Route path="/cashin" element={<Cashin />} />
        <Route path="/cashout" element={<CashOut />} />
      </Routes>
    
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
