import * as AType from "../actions/Action";

const initState = {
    data: JSON.parse(localStorage.getItem("cart")),
    error: false,
    loading: true
}

const CartReducer = (state = initState, action) => {

    switch (action.type) {
        case AType.addToCart:
            return {
                ...state,
                loading: action.loading,
                data: action.data
            }

        case AType.getWithCategory:
            return {
                ...state,
                data: action.data,
                error: action.error,
                loading: action.loading
            }

        case AType.changeCart:
            return {
                ...state,
                loading: action.loading,
                data: action.data
            }

        default:
            return state
    }
}

export default CartReducer