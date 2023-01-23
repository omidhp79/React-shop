import { useEffect } from "react"
import { ToastContainer } from "react-toastify";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import "react-toastify/dist/ReactToastify.css";

const Layout = (props) => {
    useEffect(() => {
        document.title = props.Title
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className={props.cssClass}>

            <ToastContainer />
            {
                props.inDashboard
                    ? null
                    : <Header />
            }

            {props.Loading == true &&
                <div className="boxLoading">
                    <div className="lds-ripple"><div></div><div></div></div>
                </div>
            }

            <div className={props.childCssClass}>
                {props.children}
            </div>

            {
                props.inDashboard
                    ? null
                    : <Footer />
            }

        </div>
    )
}

export default Layout