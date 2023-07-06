import {useParams} from "react-router-dom";
import Layout from "../../Layout/Layout";
import {ArticleContextProvider} from "../Store/article-context";
import {Fragment, useEffect, useState} from "react";
import FreeArticleList from "../FreeArticleList";

const FreeArticleListPage = () => {
    let {pageId} = useParams();
    const [key, setKey] = useState(pageId);
    useEffect(()=>{
        setKey(pageId);
    },[pageId]);
    return(
        <Layout>
            <h1>자유게시판</h1>
            <ArticleContextProvider>
                <Fragment>
                    <FreeArticleList key={key} item={pageId}/>
                </Fragment>
            </ArticleContextProvider>
        </Layout>
    )

}
export default FreeArticleListPage;