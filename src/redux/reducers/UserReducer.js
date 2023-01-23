import { getDataByToken, SingUpUser, userLoginType } from "../actions/UserAction";

const initstate = {
    data: [],
    error: false
}

const UserReducer = (state = initstate, action) => {
    switch (action.type) {
        case SingUpUser:
            return {
                ...state,
                data: action.data,
                error: action.error
            }
        case userLoginType:
            return {
                ...state,
                data: action.data,
                error: action.error
            }
        case getDataByToken:
            return {
                ...state,
                data: action.data,
                error: action.error
            }

        default:
            return state
    }
}

export default UserReducer
