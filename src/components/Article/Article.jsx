import { useNavigate } from "react-router-dom";

import styled from 'styled-components';

const Article = (props) => {

    let navigate = useNavigate();

    const id = (props.item && props.item.articleId) ? props.item.articleId.toString() : '';

    const backHandler = (event) => {
        event.preventDefault();
        navigate(-1);
    }

    const updateHandler = (event) => {
        event.preventDefault();
        navigate("../update/" + id);
    }

    const deleteHandler = (event) => {
        event.preventDefault();
        if (window.confirm("삭제하시겠습니까?")){
            props.onDelete(id);
        }
    }
    const renderHTML = (html) => {
        return { __html: html };
    }
    const IntroduceContent = styled.div`
  position: relative;
  border: 0.0625rem solid #d7e2eb;
  border-radius: 0.75rem;
  overflow: hidden;
  padding: 1.5rem;
  width: 70%;
  margin: 0 auto;
  margin-bottom: 2rem;
`;
    return (
        <div>
            <header>
                <IntroduceContent>
                    <h4>{props.item && props.item.articleTitle}</h4>
                    <span>닉네임: {props.item && props.item.memberNickname}</span><br />
                    <span>날짜 : {props.item && props.item.updatedAt}</span>
                </IntroduceContent>
            </header>
            <div>
                <IntroduceContent dangerouslySetInnerHTML={renderHTML(props.item && props.item.articleBody)}></IntroduceContent>
            </div>
            {props.item && props.item.written &&
                <div style={{ display: 'flex', justifyContent: 'center'}}>
                    <button onClick={updateHandler} style={{marginRight: '5px'}}>
                        수정</button><br />
                    <button onClick={deleteHandler}>삭제</button>
                </div>
            }
        </div>

    );
}

export default Article;