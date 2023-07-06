import { Fragment } from "react";
import { useParams } from "react-router-dom";
import ArticleOne from "../ArticleOne";
import Comment from "../CommentList";
import Recommend from "../Recommend";
import { ArticleContextProvider } from "../Store/article-context";
import { CommentContextProvider } from "../Store/comment-context";
import { RecommendContextProvider } from "../Store/recommend-context";

const ArticleOnePage = () => {
    let { articleId } = useParams();

    return (
        <Fragment>
            <ArticleContextProvider>
                <ArticleOne item={articleId}/>
            </ArticleContextProvider>
            <RecommendContextProvider>
                <Recommend item={articleId}/>
            </RecommendContextProvider>
            <CommentContextProvider>
                <Comment item={articleId}/>
            </CommentContextProvider>
        </Fragment>
    )
};

export default ArticleOnePage;