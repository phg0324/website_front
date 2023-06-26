import React, {useContext, useEffect, useState} from 'react';
import './signup.scss';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "./Store/auth-context.tsx";
const Login  = () => {
    const [useremail, setUseremail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const toSignup = () => {
        navigate('/signup');
    };

    const handleLogin  = async (e) => {
        e.preventDefault();
        console.log("로그인 실행")
        authCtx.login(useremail, password);
        console.log("로그인 성공여부")
        console.log(authCtx.isSuccess);

    };
    useEffect(() => {
        console.log(authCtx.isSuccess); // 상태가 변경될 때마다 동작 수행
        if (authCtx.isSuccess){
            navigate("/home",{replace: true});
        }
    }, [authCtx.isSuccess]);
    return (
        <div className="signup">
            <div className ="content">
                <h1 className = "title">개쩌는 로그인</h1>
                <form onSubmit={handleLogin}>
                    <label>
                        이메일:
                        <input
                            type="text"
                            value={useremail}
                            onChange={(e) => setUseremail(e.target.value)}
                            required
                        />
                    </label>
                    <br/>
                    <label>
                        비밀번호:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <br/>
                    <div classNmae="btn_group">
                        <button type="submit">로그인</button>

                        <div className="space">
                        </div>
                        <button onClick={toSignup}>회원가입</button>
                    </div>

                </form>
            </div>

        </div>
    );
};

export default Login;
