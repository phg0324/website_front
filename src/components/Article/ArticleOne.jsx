import { useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import ArticleContext from "./Store/article-context";
import AuthContext from "../Signup/Store/auth-context";
import Article from './Article';
import Layout from "../Layout/Layout";



const ArticleOne = (props) => {

    let navigate = useNavigate();

    const [article, setArticle] = useState();
    const [isLoading, setIsLoading ] = useState(false);

    const authCtx = useContext(AuthContext);
    const articleCtx = useContext(ArticleContext);
    let isLogin = authCtx.isLoggedIn;
    const id = String(props.item);

    const deleteHandler = (id) => {
        articleCtx.deleteArticle(authCtx.token, id);
        alert("삭제되었습니다.");
        navigate("/page/1")
    }

    const getContext = useCallback(() => {
        setIsLoading(false);
        (isLogin ? articleCtx.getArticle(id, authCtx.token) : articleCtx.getArticle(id));
    }, [isLogin])

    useEffect(() => {
        getContext();
    }, [getContext])

    useEffect(() => {
        if (articleCtx.isSuccess) {
            setArticle(articleCtx.article);
            console.log(article);
            console.log(article?.cratedAt);
            setIsLoading(true);
        }
    }, [articleCtx, article]);

    let content = <p>Loading</p>

    if (isLoading && article) {
        content = <Article item={article} onDelete={deleteHandler} />
    }

    return (
        <Layout>
            <div>
                {content}
            </div>
        </Layout>
    );
}

export default ArticleOne;