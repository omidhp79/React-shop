import { BsEmojiHeartEyes, BsPower, BsSearch } from "react-icons/bs"
import { CheckToken } from "../../../Authentication/TokenSetting/TokenSetting";
import css from "./SideBarStyle.module.css"
import { useEffect, useState } from 'react';
import { MdViewQuilt } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";

const SideBar = () => {
    const [userFond, setUserFond] = useState(CheckToken());
    const redirevtToHome = useNavigate();

    useEffect(() => {
        document.body.className = `${css.bgLoghtGray}`;
    }, [])

    const Logoutuser = () => {
        localStorage.clear("token")
        redirevtToHome('/')
    }

    return (
        <>
            <header className={css.headerBox}>
                <div className={css.headerContainer}>

                    <div className={css.freeSpace}></div>

                    <div className={css.searchBox}>
                        <input className={"form-control " + (css.searchInput)} />
                        <BsSearch className={css.iconSearch} />
                    </div>

                    <div className={css.userInfoBox}>

                        {userFond.found
                            ? <p className={css.userName}>{userFond.data}</p>
                            : null
                        }

                        <div className={css.ImgBox}>
                            <BsEmojiHeartEyes />
                        </div>

                    </div>

                </div>

            </header>

            <div className={css.sideBarBox}>


                <div className={css.sideBarHead}>
                    <p className={css.sideBarHeadName}>Alpha Dashboard</p>
                    <MdViewQuilt />
                </div>

                <div className={css.sideBarItems}>

                    <NavLink to={'/dashboard'} className={({ isActive }) =>
                        isActive ? css.activeLink : css.sideItem
                    } end>
                        داشبور
                    </NavLink>

                    <NavLink to={'MyFavorites'} className={({ isActive }) =>
                        isActive ? css.activeLink : css.sideItem
                    }>
                        علاقه مندی ها
                    </NavLink>

                    <NavLink to={'MyFactors'} className={({ isActive }) =>
                        isActive ? css.activeLink : css.sideItem
                    }>
                        فاکتور ها
                    </NavLink>

                    <button className={"btn " + css.logoutBtn} onClick={Logoutuser}>
                        خروج
                        <BsPower className="me-2" />
                    </button>

                </div>

            </div>
        </>
    )
}

export default SideBar