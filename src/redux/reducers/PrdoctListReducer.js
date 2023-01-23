import * as AType from "../actions/Action";

const initState = {
    data: [],
    error: false,
    loading: true
}

const ProductListReducer = (state = initState, action) => {

    switch (action.type) {
        case AType.getPrdList:
            return {
                ...state,
                data: action.data,
                error: action.error,
                loading: action.loading
            }

        case AType.getWithCategory:
            return {
                ...state,
                data: action.data,
                error: action.error,
                loading: action.loading
            }

        default:
            return state
    }
}

export default ProductListReducer