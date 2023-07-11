import * as React from 'react';
import {Navigate, Routes, Route} from "react-router-dom";
import { RecoilRoot } from 'recoil';
import Home from './components/Home';
import Login from "./components/Signup/Login";
import Signup from "./components/Signup/Signup";
import ChangeNickname from "./components/Signup/ChangeNickname";
import ChangePassword from "./components/Signup/ChangePassword";
import Profile from "./components/Signup/Profile";
import MainArticleListPage from "./components/Article/Pages/MainArticleListPage";
import ArticleOnePage from "./components/Article/Pages/ArticleOnePage";
import CreateArticlePage from "./components/Article/Pages/CreateArticlePage";
import AuthContext from "./components/Signup/Store/auth-context";
import UpdateArticlePage from "./components/Article/Pages/UpdateArticlePage";
import {useContext} from "react";
function App() {
    const authCtx = useContext(AuthContext);
  return (
      <div>
        <Routes>
          <Route path="/login/*" element={<Login />}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/signup/" element={<Signup />}/>
          <Route path="/profile/" element={<Profile />}/>
          <Route path="/changenickname/" element={<ChangeNickname />}/>
          <Route path="/changepassword/" element={<ChangePassword />}/>

            <Route path="/page/:pageType/:pageId/:pageSort" element={<MainArticleListPage/>}/>
            <Route path="/article/:articleId" element={<ArticleOnePage />} />
            <Route path="/create" element={authCtx.isLoggedIn ? <CreateArticlePage /> : <Navigate to='/home' />} />
            <Route path="/update/:articleId" element={authCtx.isLoggedIn ? <UpdateArticlePage /> : <Navigate to='/home' />} />


        </Routes>
      </div>

  );
}

export default App;

