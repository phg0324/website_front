import React, { useCallback, useContext, useEffect, useState, useRef } from 'react';
import AuthContext from "../Signup/Store/auth-context";
import CommentContext from "./Store/comment-context";
import Comment from './Comment';

const CommentList = (props) => {

    const [comments, setComments] = useState();
    const [isLoading, setIsLoading] = useState(false);


    const [commentRef, setCommentRef] = useState(null);
    const authCtx = useContext(AuthContext);
    const commentCtx = useContext(CommentContext);

    let isLogin = authCtx.isLoggedIn;
    let isSuccess = commentCtx.isSuccess;
    const token = authCtx.token;
    const articleId = String(props.item);

    const getContext = useCallback(() => {
        setIsLoading(false);
        (isLogin ? commentCtx.getComments(articleId, authCtx.token) : commentCtx.getComments(articleId));
        console.log("get comment");
    }, [isLogin]);

    useEffect(() => {
        getContext();
    }, [getContext]);

    useEffect(() => {
        if (isSuccess) {
            setComments(commentCtx.commentList);
            console.log(comments);
            setIsLoading(true);
        }
    }, [isSuccess]);

    const createComment = (event) => {
        event.preventDefault();
        const comment =
            {
                articleId: articleId,
                body: commentRef
    }
        commentCtx.createComment(comment, token);
    };

    const deleteComment = (commentId) => {
        commentCtx.deleteComment(commentId, articleId, token);
        console.log(commentId, articleId, token)
    }

    let media = <h3>is Loading...</h3>

    if (isLoading && comments) {
        if (comments && comments.length > 0) {
            console.log("if start")
            console.log(comments);
            media = (<ul>
                {
                    comments.map((comment) => {
                        return (<div>
                                <Comment
                                    key={comment.commentId}
                                    commentId={comment.commentId}
                                    memberNickname={comment.memberNickname}
                                    commentBody={comment.commentBody}
                                    createdAt={comment.createdAt.toString()}
                                    written={comment.written}
                                    onDelete={deleteComment}
                                />
                                <br/>
                            </div>

                        )}
                    )
                }
            </ul>)
        } else {
            media = <div></div>
        }


    }

    return (
        <div>
            {media}
            {isLogin &&
                <form onSubmit={createComment}>
                    <label htmlFor="inputName">{authCtx.userObj.nickname}</label>
                    <textarea
                        name="comment"
                        cols={100}
                        rows={3}
                        onChange={(e) => setCommentRef(e.target.value)}/>
                    <input type="submit"/>
                </form>}
        </div>
    );
}

export default CommentList;