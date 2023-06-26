import React from "react";
import './signup.scss';
import ChangePassword from "./ChangePassword";
import ChangeNickname from "./ChangeNickname";
import {useNavigate} from "react-router-dom";
const Profile = () => {
    const navigate = useNavigate();
    const toChangeNickname = () => {
        navigate('/changenickname');
    };
    const toChangePassword = () => {
        navigate('/changepassword');
    };

    return(
        <div className="signup">
            <h3>나중에 drop box같은거로 바꿀예정</h3>
            <div className ="content">

                <div classNmae="btn_group">
                    <button onClick={toChangeNickname}>닉네임 변경</button>
                    <div className="space">
                    </div>
                    <button onClick={toChangePassword}>비밀번호 변경</button>
                </div>

            </div>
        </div>
    )
}

export default Profile;