import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import blogDetailsReducer from './reducers/blogDetailsReducer'
import userDetailsReducer from './reducers/userDetailsReducer'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'


const reducer = combineReducers({
    blogs: blogReducer,
    notification: notificationReducer,
    users: userReducer,
    blogDetails: blogDetailsReducer,
    userDetails: userDetailsReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store