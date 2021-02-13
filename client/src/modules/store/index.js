import {createStore,applyMiddleware, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import {sagas as auth} from '../auth'
import {sagas as posts} from '../posts'
import {sagas as channels} from '../channels'

const sagaMiddleware = createSagaMiddleware()

export default createStore(reducers, compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
))

sagaMiddleware.run(auth)
sagaMiddleware.run(posts)
sagaMiddleware.run(channels)
