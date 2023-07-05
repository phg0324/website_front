import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { ArticleContextProvider } from "./Store/article-context";

const MainArticleListPage = () => {
    let {pageId} = useParams();
    return(
        <ArticleContextProvider>
            <Fragment>
                <ArticleList item={pageId}/>
                <SearchForm />
            </Fragment>
        </ArticleContextProvider>
    )
}

export default MainArticleListPage