import { useParams } from "react-router-dom";
import CreateArticleForm from "../CreateArticleForm";
import { ArticleContextProvider } from "../Store/article-context";
import Layout from "../../Layout/Layout";


const UpdateArticlePage = () => {

    let { articleId } = useParams();

    return (
        <Layout>
            <ArticleContextProvider>
                <CreateArticleForm item={articleId} />
            </ArticleContextProvider>
        </Layout>
    );
}

export default UpdateArticlePage;