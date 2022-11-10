import { BrowserRouter, Route, Routes } from "react-router-dom";
import ToDoList from "./todo/ToDoList";
import Login from "./login/Login";
import SignUp from "./login/SignUp";
import UserCreated from "./login/UserCreated";
import { useCallback, useState } from "react";
import ActivateUser from "./login/ActivateUser";
import axios from "axios";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const handleLogout = useCallback(() => {
    axios.interceptors.request.use((config) => {
      if (config.headers?.Authorization) delete config.headers.Authorization
      return config
    })
    setIsLoggedIn(false)
  }, [])

  return (
    <BrowserRouter>
      {!isLoggedIn ? (
        <Routes>
          <Route path="/" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/userCreated" element={<UserCreated />} />
          <Route path="/activateUser" element={<ActivateUser />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<ToDoList onLogout={handleLogout}/>} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
