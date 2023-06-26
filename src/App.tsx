import * as React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { RecoilRoot } from 'recoil';
import Home from './components/Home';
import Login from "./components/Signup/Login";
import Signup from "./components/Signup/Signup";
import ChangeNickname from "./components/Signup/ChangeNickname";
import ChangePassword from "./components/Signup/ChangePassword";
import Profile from "./components/Signup/Profile";
function App() {
  return (
      <div>
        <Routes>
          <Route path="/login/*" element={<Login />}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/signup/" element={<Signup />}/>
          <Route path="/profile/" element={<Profile />}/>
          <Route path="/changenickname/" element={<ChangeNickname />}/>
          <Route path="/changepassword/" element={<ChangePassword />}/>
        </Routes>
      </div>

  );
}

export default App;

