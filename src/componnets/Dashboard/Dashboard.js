import { Navigate, Outlet } from "react-router"
import Layout from "../../layout/Layout"
import { CheckToken } from "../Authentication/TokenSetting/TokenSetting";
import SideBar from "./DashboardComponnents/SideBar/SideBar";
import css from "./Dashboard.module.css";

const Dashboard = () => {    

    let getToken = CheckToken();
    if (!getToken.found) {
        return <Navigate to={'/'} />
    }
    return (
        <Layout Title={"Dashboard"} inDashboard={true} childCssClass={css.bodyBg}>
            <SideBar />
            <div className={css.contentBox}>

                <Outlet/>
                
            </div>
        </Layout>
    )
}

export default Dashboard