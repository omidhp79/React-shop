import axios from "axios";
import { toast } from "react-toastify";

export const SingUpUser = "SingUpUser";
export const userRegisterHttp = (usreData) => {
    return async dispatch => {
        let error = false, result = null;
        try {
            result = await axios.post(
                "http://localhost:3001/users",
                usreData
            );

            toast.success(`ثبت نام با موفقیت انجام شد `, {
                position: toast.POSITION.TOP_LEFT,
                theme: "dark",
                draggableDirection: "rtl"
            });

            localStorage.setItem("token", usreData.token)

        } catch (error) {
            error = true;
            toast.error(`ثبت نام با خطا مواجه شد `, {
                position: toast.POSITION.TOP_LEFT,
                theme: "dark",
                draggableDirection: "rtl"
            });
        }
        dispatch({
            type: SingUpUser,
            error: error,
            data: result
        });

    }
}

export const userLoginType = "userLoginType";
export const userLoginCheck = (finalUser) => {
    return async dispatch => {
        let error = false, result = null, findUser;

        try {
            result = await axios.get("http://localhost:3001/users");

            if (result.status == 200) {

                findUser = result.data.filter(item => {
                    return item.userName == finalUser.userName;
                });

                if (findUser.length == 0) {
                    findUser = null;
                    toast.error(` نام کاربری اشتباه می باشد `, {
                        position: toast.POSITION.TOP_LEFT,
                        theme: "dark",
                        draggableDirection: "rtl"
                    });
                }
                else if (findUser[0].password != finalUser.password) {
                    findUser = null;
                    toast.error(` گذرواژه صحیح نیست `, {
                        position: toast.POSITION.TOP_LEFT,
                        theme: "dark",
                        draggableDirection: "rtl"
                    });
                }
                else {
                    toast.success(`خوش آمدید  ${findUser[0].name + " " + findUser[0].lastName}`, {
                        position: toast.POSITION.TOP_LEFT,
                        theme: "dark",
                        draggableDirection: "rtl"
                    });
                    localStorage.setItem("token", findUser[0].token)
                }
            }

        } catch (error) {
            error = true;
            toast.error(`عملیات با خطا مواجه شد `, {
                position: toast.POSITION.TOP_LEFT,
                theme: "dark",
                draggableDirection: "rtl"
            });
        }

        dispatch({
            type: userLoginType,
            error: error,
            data: findUser
        });
    }
}

export const getDataByToken = "getDataByToken";
export const getDataByTokenHttp = (token) => {
    return async dispatch => {
        let error = false, result = null, findUser;

        try {
            result = await axios.get("http://localhost:3001/users");
            if (result.status == 200) {
                findUser = result.data.filter(item => {
                    return item.token == token;
                });
            }

        } catch (error) {
            error = true;
            toast.error(`عملیات با خطا مواجه شد `, {
                position: toast.POSITION.TOP_LEFT,
                theme: "dark",
                draggableDirection: "rtl"
            });
        }

        dispatch({
            type: userLoginType,
            error: error,
            data: findUser
        });
    }
}