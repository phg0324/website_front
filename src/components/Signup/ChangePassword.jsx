import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from "./Store/auth-context.tsx";
import './signup.scss';
const ChangePassword = () => {

    let navigate = useNavigate();

    const authCtx = useContext(AuthContext);
    const [oldPw,setOldPw] = useState('');
    const [newPw, setNewPw] = useState('');
    const [newPwcheck, setNewPwcheck] = useState('');

    const submitHandler = (event) => {
        event.preventDefault();
        
        if (newPw !== newPwcheck) {
            alert("새 비밀번호를 잘못 입력하였습니다.")
        }
        authCtx.changePassword(oldPw, newPw);
        console.log(authCtx.isSuccess);
        if (authCtx.isSuccess) {
            alert("변경 되었습니다.");
            alert("다시 로그인 하세요");
            authCtx.logout();
            navigate("/home", { replace: true });
        }
    }

    return (
        <div className ="signup">
            <div className ="content">
                <h1 className = "title">비밀번호 변경</h1>
                <form onSubmit={submitHandler}>

                        <label>기존 비밀번호
                            <input type='password' value={oldPw} minLength={8} onChange={(e) => setOldPw(e.target.value)} required/>
                        </label>


                        <label>새 비밀번호
                            <input type='password' value={newPw} minLength={8} onChange={(e) => setNewPw(e.target.value)} required/>
                        </label>


                        <label>새 비밀번호 확인
                            <input type='password' value={newPwcheck} minLength={8} onChange={(e) => setNewPwcheck(e.target.value)} required/>
                        </label>

                    <div classNmae="btn_group">
                        <button type='submit'>비밀번호 변경</button>
                    </div>
                </form>
            </div>

        </div>

    );
}

export default ChangePassword;