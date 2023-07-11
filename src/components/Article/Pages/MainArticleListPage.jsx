import {Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ArticleContextProvider } from "../Store/article-context";
import MainArticleList from "../MainArticleList"
import Layout from "../../Layout/Layout";
const MainArticleListPage = () => {
    let {pageId, pageType, pageSort} = useParams();
    const [key, setKey] = useState(pageId);
    useEffect(()=>{
        setKey(pageId);
    },[pageId]);
    return(
        <Layout>
            <h1>전체게시판</h1>
            <ArticleContextProvider>
                <Fragment>
                    <MainArticleList key={key} item={pageId} type={pageType} sort={pageSort}/>
                </Fragment>
            </ArticleContextProvider>
        </Layout>
    )
}

export default MainArticleListPage