import React, { useContext, useEffect, useState } from 'react';
import Layout from "./Layout/Layout";
import AuthContext from "./Signup/Store/auth-context.tsx";
import axios from 'axios';

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
            <h2>hi {nickname} </h2>
        )}
        </Layout>
    )
}

export default Home;