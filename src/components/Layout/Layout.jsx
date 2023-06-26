import Header from "./Header";
import './layout.scss'
const Layout = (props) => {
    return(
        <div className="layout">
            <Header/>
            <main className="main">
                {props.children}
            </main>
        </div>
    )
}
export default Layout