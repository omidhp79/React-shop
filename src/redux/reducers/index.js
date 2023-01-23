import { combineReducers } from "redux";
import CartReducer from "./CartRedeucer";
import CategoryReducer from "./CategoryReducer";
import ProductListReducer from "./PrdoctListReducer";
import ProductReducer from "./ProductReducer";
import UserReducer from "./UserReducer";

const rootReducer = combineReducers({
    CategoryReducer:CategoryReducer,
    PrdList:ProductListReducer,
    singlePrd:ProductReducer,
    Cart:CartReducer,
    User:UserReducer
})

export default rootReducer