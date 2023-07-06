import React, {useContext, useEffect, useState} from 'react';
import './signup.scss';
import Swal from "sweetalert2";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import AuthContext from "./Store/auth-context.tsx";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [check_password, setCheckPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const handleSignup = async (e) => {
        e.preventDefault();

        authCtx.signup(email, password, nickname);
        console.log(authCtx.isSuccess)
        if (authCtx.isSuccess){
            navigate('/home',{replace: true});
        }
    };
    useEffect(() => {
        console.log(authCtx.isSuccess); // 상태가 변경될 때마다 동작 수행
        if (authCtx.isSuccess){
            navigate("/home",{replace: true});
            authCtx.isSuccess = false;
        }
    }, [authCtx.isSuccess]);
    // const handleEmailVerification = () => {
    //     console.log('이메일 인증 요청');
    // }
    return (
        <div className="signup">
            <div className ="content">
                <h1 className = "title">개쩌는 회원가입</h1>
                <form onSubmit={handleSignup}>
                    <label>
                        이메일:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {/*<button type="button" onClick={handleEmailVerification}>*/}
                        {/*이메일 인증 (특징: 구현안됨)*/}
                        {/*</button>*/}
                    </label>
                    <label>
                        닉네임:
                        <input
                            type="text"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        비밀번호:
                        <input
                            type="password"
                            value={password}
                            minLength={8}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                         비밀번호 확인:
                        <input
                            type="password"
                            value={check_password}
                            minLength={8}
                            onChange={(e) => setCheckPassword(e.target.value)}
                            required
                        />
                    </label>

                    <button type="submit">가입하기</button>
                </form>
            </div>

        </div>
    );
};

export default Signup;
