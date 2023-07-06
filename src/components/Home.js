import React, {Fragment, useContext, useEffect, useState} from 'react';
import Layout from "./Layout/Layout";
import AuthContext from "./Signup/Store/auth-context.tsx";
import {useNavigate} from "react-router-dom";


const Home = () => {
    const authCtx = useContext(AuthContext);
    const [nickname, setNickname] = useState('');
    let isLogin = authCtx.isLoggedIn;
    let isGet = authCtx.isGetSuccess;
    const callback =(str) =>{
        setNickname(str);
    }
    useEffect(() =>{
        if (isLogin){
            console.log('start');
            authCtx.getUser();
        }
    }, [isLogin]);

    useEffect(() => {
        if (isGet){
            console.log('get start');
            callback(authCtx.userObj.nickname);
        }
    },[isGet]);

    return (
        <Layout>{isLogin && (
            <h2>진짜하네 ㅋㅋ <br/>hi {nickname} </h2>
        )}
            {!isLogin &&(
                <h2>회원가입 및 로그인을 해주세요</h2>
            )}
        
        </Layout>
    )
}

export default Home;