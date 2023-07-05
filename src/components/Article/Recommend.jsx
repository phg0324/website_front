import React, { useCallback, useContext, useEffect, useState } from 'react';

import EmptyHeart from './images/black_heart.png';
import Heart from './images/red_heart.png';
import AuthContext from "../Signup/Store/auth-context";
import RecommendContext from "./Store/recommend-context";
type Props = { item:string | undefined }
type Recommends = {
    recommendNum: number
    recommended: boolean
}
const Recommend:React.FC<Props> = (props) => {

    const [isLoading, setIsLoading] = useState(false);

    const [recommends, setRecommends] = useState<Recommends>();

    const authCtx = useContext(AuthContext);
    const recommendCtx = useContext(RecommendContext);


    let isLogin = authCtx.isLoggedIn;
    const id = String(props.item);

    const getContext = useCallback(() => {
        setIsLoading(false);
        (isLogin ? recommendCtx.getRecommends(id, authCtx.token) : recommendCtx.getRecommends(id));
    }, [isLogin])

    useEffect(() => {
        getContext();
    }, [getContext]);

    useEffect(() => {
        if (recommendCtx.isSuccess) {
            setRecommends(recommendCtx.recommends);
            console.log(recommends);
            console.log("set");
            setIsLoading(true);
        }
    }, [recommendCtx, recommends])

    useEffect(() => {
        if (recommendCtx.isChangeSuccess) {
            setRecommends(recommendCtx.recommends);
            console.log(recommends);
            console.log("change set");
            setIsLoading(true);
        }
    }, [recommendCtx.isChangeSuccess])


    const changeRecommend = () =>{
        if (!isLogin) {
            return alert("로그인 하세요");
        } else {
            if (recommends && recommends.recommended) {
                recommendCtx.deleteRecommend(id, authCtx.token);
            } else {
                recommendCtx.postRecommend(id, authCtx.token);
            }
        }

    }

    const heartImage = (heart) => {
        return (
            <img alt="heart" src={heart} onClick={changeRecommend}/>
        )
    }

    let media = <h3>is Loading...</h3>

    if (isLoading && recommends) {
        media = (
            <div>
                {recommends.recommended ? heartImage(Heart) : heartImage(EmptyHeart)}
                <h4>좋아요 숫자 {recommends.recommendNum}</h4>
            </div>
        )
    }

    return (
        <div>
            {media}
        </div>
    );
}

export default Recommend;