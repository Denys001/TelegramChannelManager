import {createStore, applyMiddleware, combineReducers, compose} from "redux"
import { reducer as formReducer } from 'redux-form'
import thunkMiddleware from "redux-thunk"
import authReducer from './reducers/authReducer'
import channelsReducer from './reducers/channelsReducer'
import postsReducer from './reducers/postsReducer'
const reducers = combineReducers({
    form: formReducer,
    auth: authReducer,
    channels: channelsReducer,
    posts: postsReducer,
})

export const store = createStore(reducers, compose(
    applyMiddleware(thunkMiddleware), 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    
))