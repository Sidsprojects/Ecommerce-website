import {createStore,combineReducers,applyMiddleware} from "redux"
import {thunk} from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { productReducers, productdetailsReducers } from "./reducers/productReducer"
import { userReducer } from "./reducers/userReducer"

const reducer = combineReducers({
    products:productReducers,
    productDetails: productdetailsReducers,
    user: userReducer,
})
let initialState = {}
const  middleware =  [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)


export default store