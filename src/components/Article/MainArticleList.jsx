import { useCallback, useContext, useEffect, useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import ArticleContext from "./Store/article-context";
import Paging from "./Paging";
import AuthContext from "../Signup/Store/auth-context";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootStrapTable from 'react-bootstrap-table-next';
import { Button } from 'react-bootstrap';

const MainArticleList = (props) => {
    const navigate = useNavigate();
    const pageId = String(props.item);

    const columns = [{
        dataField: 'articleId',
        text: '#',
        headerStyle: () => {
            return { width: "8%" };
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
    },]

    const authCtx = useContext(AuthContext);
    const articleCtx = useContext(ArticleContext);

    const [AList, setAList] = useState([]);
    const [maxNum, setMaxNum] = useState(1);
    let isLogin = authCtx.isLoggedIn;
    const fetchListHandler = () => {
        articleCtx.getPageList(pageId);
    };

    useEffect(()=>{
        fetchListHandler();
    }, []);

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
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }} >
                <Paging currentPage={Number(pageId)} maxPage={maxNum}/>
            </div>

        </div>
    )
}
export default MainArticleList;