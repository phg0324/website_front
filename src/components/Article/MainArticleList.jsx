import React, { useCallback, useContext, useEffect, useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import ArticleContext from "./Store/article-context";
import Paging from "./Paging";
import AuthContext from "../Signup/Store/auth-context";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootStrapTable from 'react-bootstrap-table-next';
import {Button, Dropdown, DropdownButton} from 'react-bootstrap';
import RecommendContext from "./Store/recommend-context";

const MainArticleList = (props) => {
    const navigate = useNavigate();
    const pageId = String(props.item);
    const pageType = String(props.type);
    const pageSort = String(props.sort);
    const [sort, setSort] = useState(pageSort);
    const columns = [{
        dataField: 'articleId',
        text: '#',
        headerStyle: () => {
            return { width: "4%" };
        }
    },{
        dataField: 'articleReads',
        text: '조회수',
        headerStyle: () => {
            return { width: "4%" };
        }
    }, {
        dataField: 'articleType',
        text: '분류',
        headerStyle: () => {
            return { width: "10%" };
        }
    },{
            dataField: 'articleTitle',
            text: '제목',
            headerStyle: () => {
                return { width: "65%" };
            },
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    const articleIdNum = row.articleId;
                    navigate(`../article/${articleIdNum}`);
                }
            }

},{
        dataField: 'memberNickname',
        text: '닉네임'
    },{
        dataField: 'createdAt',
        text: '작성일'
    },{
        dataField: 'articleComments',
        text: '댓글수',
        headerStyle: () => {
            return { width: "4%" };
        }
    }, {
        dataField: 'articleLikes',
        text: '좋아요',
        headerStyle: () => {
            return { width: "4%" };
        }
    }]

    const authCtx = useContext(AuthContext);
    const articleCtx = useContext(ArticleContext);

    const [AList, setAList] = useState([]);
    const [maxNum, setMaxNum] = useState(1);
    let isLogin = authCtx.isLoggedIn;
    const fetchListHandler = () => {
        articleCtx.getPageList(pageId,pageType,pageSort);
        setSort(pageSort);
    };
    const types =[
        {value: "id", name: "기본"},
        {value: "view", name: "조회순"},
        {value: "likes", name: "추천순"},
        {value: "comments", name: "댓글순"}
    ];
    const SelectBox = (props) =>{
        const handleChange = (e) =>{
            setSort(e.target.value);
            console.log(e.target.value);
            console.log(sort);
            navigate('/page/'+pageType+'/1/'+e.target.value);
        };
        return(
            <select value={sort} onChange={handleChange}>
                {props.options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>
        );
    }
    useEffect(()=>{
        fetchListHandler();
    }, [sort,pageType,sort]);

    useEffect(() =>{
        if(articleCtx.isSuccess){
            setAList(articleCtx.page);
            setMaxNum(articleCtx.totalPages);
        }
    }, [articleCtx])
    return(
        <div>
            <BootStrapTable keyField='id' data = { AList } columns={ columns } />
            <div>{isLogin &&
                <Link to="/create">
                    <Button>글 작성</Button>
                </Link>
            }
            <SelectBox options={types} defaultValue={sort}></SelectBox>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }} >
                <Paging currentPage={Number(pageId)} maxPage={maxNum}/>
            </div>

        </div>
    )
}
export default MainArticleList;