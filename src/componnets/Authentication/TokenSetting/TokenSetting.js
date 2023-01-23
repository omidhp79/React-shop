import { useSelector } from "react-redux";
import GetUserWithToken from "./GetUserWithToken";

export const CheckToken = () => {    
    let token = localStorage.getItem("token");
    let userFound = {
        found: false,
        data: null
    }

    if (token == null || token == undefined || token == "undefined" || token == "") {
        return userFound
    }
    else {
        userFound = {
            found: true,
            data: <GetUserWithToken token={token}/>
        }

        return userFound
    }
}

export const CreateToken = () => {
    const rand = () => Math.random(0).toString(36).substr(2);
    const token = (length) => (rand() + rand() + rand() + rand()).substr(0, length);

    return token(40)
}