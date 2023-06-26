import './header.scss'
import { useNavigate } from "react-router-dom";

import AuthContext from "../Signup/Store/auth-context.tsx";
import {useContext} from "react";

const Header = () => {
    const authCtx = useContext(AuthContext);
    let isLogin = authCtx.isLoggedIn;

    const navigate = useNavigate();
    const toLogin = () => {
       navigate('/login');
    }
    const toSignup = () => {
        navigate('/signup');
    }
    const toProfile = () => {
        navigate('/profile');
    }
    const logoutHandler = () => {
        authCtx.logout();
    }
    return (
        <header className="header">
            <h1 className="header_title">대충 개쩌는 웹페이지</h1>
            <div className="header_actions">
                {!isLogin && (
                    <>
                        <button className="header_button" onClick={toLogin}>로그인</button>
                        <button className="header_button" onClick={toSignup}>회원가입</button>
                    </>
                    )}
                {isLogin && (
                    <>
                        <button className="header_button" onClick={toProfile}>마이페이지</button>
                        <button className="header_button" onClick={logoutHandler}>로그아웃</button>
                    </>
                )}
            </div>
        </header>
    )
}

export default Header