import * as AType from "../actions/Action";

const initState = {
    data: [],
    error: false,
    loading: true
}

const ProductReducer = (state = initState, action) => {

    switch (action.type) {
        case AType.getSinglePrd:
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

export default ProductReducer;