import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArticleContext from "./Store/article-context";
import AuthContext from "../Signup/Store/auth-context";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import styled from 'styled-components';
const CreateArticleForm = (props) => {

    let navigate = useNavigate();

    const articleCtx = useContext(ArticleContext);
    const authCtx = useContext(AuthContext);
    const [title, setTitle] =useState('');
    const [main, setMain] =useState(EditorState.createEmpty());
    const [type, setType] = useState("자유");
    const [saveTitle, setSaveTitle] =useState('');
    const [saveMain, setSaveMain] =useState(EditorState.createEmpty());
    const [saveType, setSaveType] = useState('');
    const mainToHtml = draftToHtml(convertToRaw(main.getCurrentContent()));
    const submitHandler = (event) => {
        event.preventDefault();

        let postArticle= {
            title: title,
            type: type,
            body: mainToHtml
    }
        if (props.item) {
            console.log('update!');
            postArticle = { ...postArticle, id:props.item }
        }

        props.item
            ? articleCtx.updateArticle(authCtx.token, postArticle) : articleCtx.createArticle(postArticle, authCtx.token);
    }
    const setUpdateArticleHandler = useCallback(() => {
        if (articleCtx.isGetUpdateSuccess && articleCtx.article) {
            const blocksFromHtml = htmlToDraft(articleCtx.article.articleBody);
            const { contentBlocks, entityMap } = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            const editorState = EditorState.createWithContent(contentState);
            setMain(editorState);
            console.log("???")
            setTitle(articleCtx.article.articleTitle);
            setType(articleCtx.article.articleType);

            setSaveTitle(articleCtx.article.articleTitle);
            setSaveType(articleCtx.article.articleType);
            setSaveMain(editorState);
        }
    }, [articleCtx.isGetUpdateSuccess, articleCtx.article]);

    useEffect(() => {
        if (props.item) {
            articleCtx.getUpdateArticle(authCtx.token, props.item);
        }
    }, [])

    useEffect(() => {
        console.log('update effect')
        setUpdateArticleHandler();
    }, [setUpdateArticleHandler])

    useEffect(() => {
        if (articleCtx.isSuccess) {
            console.log("wrting success");
            navigate(-1, { replace: true })
        }
    }, [articleCtx.isSuccess])

    const cancel = () => {
        setTitle(saveTitle);
        setType(saveType);
        setMain(saveMain);
        navigate(-1);
    }

    const MyBlock = styled.div`
    .wrapper-class{
        width: 50%;
        margin: 0 auto;
        margin-bottom: 4rem;
    }
  .editor {
    height: 700px !important;
    border: 1px solid #f1f1f1 !important;
    padding: 5px !important;
    border-radius: 2px !important;
  }
`;
    const changeMain = (editorState) => {
        setMain(editorState);
    }
    const types =[
        {value: "free", name: "자유"},
        {value: "humor", name: "유머"},
        {value: "banana", name: "바나나"}
    ];
    const SelectBox = (props) =>{
        const handleChange = (e) =>{
            setType(e.target.value);
            console.log(e.target.value);
        };
        return(
            <select value={type} onChange={handleChange}>
                {props.options.map((option) => (
                    <option key={option.value} value={option.name}>
                        {option.name}
                    </option>
                ))}
            </select>
        );
    }
    return (
        <div>
            <h2>글쓰기</h2>
            <form onSubmit={submitHandler}>

                <label style={{ display: 'flex', justifyContent: 'center' }} >
                    <input style={{width: '40%',marginRight: '50px'}}
                        type="text"
                        placeholder="제목을 입력하세요"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        defaultValue={title}
                    />
                    <SelectBox options={types} defaultValue={type}></SelectBox>
                </label>

                <br />
                <MyBlock>
                    <Editor
                        // 에디터와 툴바 모두에 적용되는 클래스
                        wrapperClassName="wrapper-class"
                        // 에디터 주변에 적용된 클래스
                        editorClassName="editor"
                        // 툴바 주위에 적용된 클래스
                        toolbarClassName="toolbar-class"
                        // 툴바 설정
                        toolbar={{
                            // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
                            list: { inDropdown: true },
                            textAlign: { inDropdown: true },
                            link: { inDropdown: true },
                            history: { inDropdown: false },
                        }}
                        placeholder="내용을 작성해주세요."
                        // 한국어 설정
                        localization={{
                            locale: 'ko',
                        }}
                        // 초기값 설정
                        editorState={main}
                        // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
                        onEditorStateChange={changeMain}
                    />
                </MyBlock>

                <br />
                <div style={{ display: 'flex', justifyContent: 'center'}}>
                    <button onClick={cancel} style={{marginRight: '5px'}}>
                        취소
                    </button>
                    <button type="submit">
                        작성
                    </button>
                </div>

            </form>
        </div>
    );
}

export default CreateArticleForm;