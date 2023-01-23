import React from "react";
import Layout from "../../layout/Layout";
import style from "./Auth.module.css";
import "./Auth.css";
import authImg from "../../assets/Images/Auth/Secound.png";
import { Link, Navigate } from "react-router-dom";
import MyInput from "../../layout/MyInput";
import { userLoginCheck } from "../../redux/actions/UserAction";
import { connect } from "react-redux";
import { CheckToken } from "./TokenSetting/TokenSetting";

class Login extends React.Component {

    state = {
        userData: {
            userName: {
                value: null,
                isValid: false
            },
            password: {
                value: null,
                isValid: false
            }
        }
    }

    setDataToState = (el) => {
        let newData = {
            ...this.state.userData,
            [el.target.id]: {
                ...this.state.userData[el.target.id],
                value: el.target.value,
                isValid: (el.target.getAttribute("data-valid") == "true")
            }
        };
        this.setState({ userData: newData });
    }

    logIinUser = () => {
        let allValid = true;

        Object.entries(this.state.userData).map(item => {
            if (!item[1].isValid) {
                allValid = false;
            }
        });

        if (allValid) {
            let finalUser =
            {
                userName: this.state.userData.userName.value,
                password: this.state.userData.password.value
            }

            this.props.checkUserLogin(finalUser)
        }
    }

    render() {

        let getToken = CheckToken();
        if (getToken.found) {
            return <Navigate to={'/Dashboard'} />
        }

        return (
            <Layout Title={"Login"}>
                {/* <div className="maxW my-5 LoginBox"> */}
                <div className={style.authBox}>
                    <div className="row">
                        <div className="col-5">
                            <p className={style.titleForm}>
                                ورود
                            </p>
                            <div className={style.inputBox}>

                                <MyInput changeEvenet={this.setDataToState} id={"userName"} type={"text"} label={"نام کاربری"} errMsg={"نام کاربری را وارد کنید"} />

                                <MyInput changeEvenet={this.setDataToState} id={"password"} type={"password"} label={"پسورد"} errMsg={"پسورد باید شامل عدد, حروف کوچک و بزرگ و 8 کارکتر باشد"} />

                                <button className="btn btnOutlineSite w-100 mb-4" onClick={this.logIinUser}>
                                    ثبت اطلاعات
                                </button>

                                <Link to={"/Signup"}>ثبت نام</Link>

                            </div>
                        </div>
                        <div className="col-7">

                            <div className={style.imgBox}>
                                <img src={authImg} className={style.authImg} />

                            </div>

                        </div>

                    </div>
                </div>
            </Layout>
        )
    }
}

const mapToProps = state => {
    return {
        foundUser: state.User
    }
}

const mapToDispatch = dispatch => {
    return {
        checkUserLogin: (finalUser) => dispatch(userLoginCheck(finalUser))
    }
}

export default connect(mapToProps, mapToDispatch)(Login);