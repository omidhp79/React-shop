import React from "react";
import { connect } from "react-redux";
import Layout from "../../layout/Layout";
import { userRegisterHttp } from "../../redux/actions/UserAction";
import style from "./Auth.module.css";
import "./Auth.css";
import authImg from "../../assets/Images/Auth/Signup.png";
import { Link, Navigate } from "react-router-dom";
import MyInput from "../../layout/MyInput";
import { CheckToken, CreateToken } from "./TokenSetting/TokenSetting";

class Signup extends React.Component {

    state = {
        newUser: {
            name: {
                value: null,
                isValid: false
            },
            lastName: {
                value: null,
                isValid: false
            },
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

    setNewUserItems = (el) => {
        const newData = {
            ...this.state.newUser,
            [el.target.id]: {
                ...this.state.newUser[el.target.id],
                value: el.target.value,
                isValid: (el.target.getAttribute("data-valid") === "true")
            }
        }
        this.setState({ newUser: newData })
    }

    signUpUser = () => {
        let allValid = true;
        Object.entries(this.state.newUser).map(item => {
            if (!item[1].isValid) {
                allValid = false
            }
        });

        if (allValid) {

            let finalData = {
                name: this.state.newUser.name.value,
                lastName: this.state.newUser.lastName.value,
                userName: this.state.newUser.userName.value,
                password: this.state.newUser.password.value,
                token: CreateToken()
            }

            this.props.userRegister(finalData)
        }
    }

    render() {
        let getToken = CheckToken();
        if (getToken.found) {
            return <Navigate to={'/Dashboard'} />
        }

        return (
            <Layout Title={"signup"}>
                {/* <div className="maxW my-5 LoginBox"> */}
                <div className={style.authBox}>
                    <div className="row">
                        <div className="col-5">
                            <p className={style.titleForm}>
                                ثبت نام
                            </p>
                            <div className={style.inputBox}>

                                <MyInput changeEvenet={this.setNewUserItems} id={"name"} type={"text"} label={"نام"} errMsg={"نام  را وارد کنید"} />

                                <MyInput changeEvenet={this.setNewUserItems} id={"lastName"} type={"text"} label={"نام خانوادگی"} errMsg={"نام خانوادگی را وارد کنید"} />

                                <MyInput changeEvenet={this.setNewUserItems} id={"userName"} type={"text"} label={"نام کاربری"} errMsg={"نام کاربری را وارد کنید"} />

                                <MyInput changeEvenet={this.setNewUserItems} id={"password"} type={"password"} label={"پسورد"} errMsg={"پسورد باید شامل عدد, حروف کوچک و بزرگ و 8 کارکتر باشد"} />

                                <button className="btn btnOutlineSite w-100 mb-4" onClick={this.signUpUser}>
                                    ثبت اطلاعات
                                </button>

                                <Link className="mb-3 me-1 d-flex" to={"/login"}>ورود</Link>

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
        userCreate: state.User
    }
}

const mapToDispatch = dispatch => {
    return {
        userRegister: (userData) => dispatch(userRegisterHttp(userData))
    }
}

export default connect(mapToProps, mapToDispatch)(Signup);
