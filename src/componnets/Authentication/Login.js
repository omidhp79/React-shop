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
                                ????????
                            </p>
                            <div className={style.inputBox}>

                                <MyInput changeEvenet={this.setDataToState} id={"userName"} type={"text"} label={"?????? ????????????"} errMsg={"?????? ???????????? ???? ???????? ????????"} />

                                <MyInput changeEvenet={this.setDataToState} id={"password"} type={"password"} label={"??????????"} errMsg={"?????????? ???????? ???????? ??????, ???????? ???????? ?? ???????? ?? 8 ???????????? ????????"} />

                                <button className="btn btnOutlineSite w-100 mb-4" onClick={this.logIinUser}>
                                    ?????? ??????????????
                                </button>

                                <Link to={"/Signup"}>?????? ??????</Link>

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