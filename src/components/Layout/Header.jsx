import './header.scss'
import { useNavigate } from "react-router-dom";

import AuthContext from "../Signup/Store/auth-context.tsx";
import React, {useContext} from "react";
import {Dropdown, DropdownButton} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';

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

    const toMainPage = () => {
        navigate('/page/1');
    };
    const toFreePage = () => {
        navigate('/freepage/1');
    }
    const toHome =() => {
        navigate('/home');
    }
    function selectType(eventKey){
        if (eventKey === "changeNic"){
            navigate('/changenickname');
        }
        if (eventKey === "changePw"){
            navigate('/changepassword')
        }
    }
    return (
        <header className="header">
            <h1 className="header_title" onClick={toHome}>대충 개쩌는 웹페이지</h1>
            <button onClick={toMainPage}>전체 게시판</button>
            <button onClick={toFreePage}>자유 게시판</button>
            <div className="header_actions">
                {!isLogin && (
                    <>
                        <button className="header_button" onClick={toLogin}>로그인</button>
                        <button className="header_button" onClick={toSignup}>회원가입</button>
                    </>
                    )}
                {isLogin && (
                    <>
                        <button className="header_button" onClick={logoutHandler}>로그아웃</button>
                        <DropdownButton className="d-flex" title="마이페이지" onSelect={selectType}>
                            <Dropdown.Item  eventKey="changeNic">닉네임 변경</Dropdown.Item>
                            <Dropdown.Item eventKey="changePw">비밀번호 변경</Dropdown.Item>
                            <Dropdown.Item eventKey="checkPro">정보 확인</Dropdown.Item>
                        </DropdownButton>

                    </>
                )}
            </div>
        </header>
    )
}

export default Header