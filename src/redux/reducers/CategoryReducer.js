import * as AType from "../actions/Action";

const initStat = {
    data: [],
    error: false,
    loading: true
}

const CategoryReducer = (state = initStat, action) => {

    switch (action.type) {
        case AType.getCatList:
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

export default CategoryReducer