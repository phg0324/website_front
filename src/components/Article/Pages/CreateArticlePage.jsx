import CreateArticleForm from "../CreateArticleForm";

import { ArticleContextProvider } from "../Store/article-context";
import Layout from "../../Layout/Layout";
const CreateArticlePage = () => {
    return (
        <Layout>
        <ArticleContextProvider>
            <CreateArticleForm item={undefined}/>
        </ArticleContextProvider>
        </Layout>
    )
}

export default CreateArticlePage;