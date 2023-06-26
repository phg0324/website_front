import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from "./Store/auth-context.tsx";
import './signup.scss';
const ChangeNickname = () => {

    let navigate = useNavigate();

    const authCtx = useContext(AuthContext);
    const [nickname, setNickname] = useState('');

    const submitHandler = (event) => {
        event.preventDefault();
        console.log('change nickname start!');
        authCtx.changeNickname(nickname);
        if (authCtx.isSuccess) {
            alert("변경 되었습니다.");
            authCtx.getUser();
            navigate("/home", { replace: true });
        }
    }

    return (
        <div className ="signup">
            <div className ="content">
                <h1 className = "title">개명하기</h1>
                <form onSubmit={submitHandler}>

                        <label>새로운 닉네임
                            <input type='text' value={nickname} minLength={3} onChange={(e) => setNickname(e.target.value)} required/>
                        </label>

                    <div classNmae="btn_group">
                        <button type='submit'>닉네임 바꾸기</button>
                    </div>
                </form>
            </div>

        </div>

    );
}

export default ChangeNickname;