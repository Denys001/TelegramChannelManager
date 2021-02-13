import { call, put, takeEvery, all } from 'redux-saga/effects'
import selectors from './selectors'
import { stopSubmit } from 'redux-form'
import action from './actions'
import { authAPI } from '../../api/api'

function* Login({ payload }) {
    yield put(action.setFetching(true))
    let result = null
    try {
        result = yield call(authAPI.login, payload)
        if (result.ResultCode === 1) {
            yield put(stopSubmit('login', { [result.field]: result.message }))
        } else {
            yield put(action.setTokens(result.token, result.refreshToken))
        }
    } catch (error) {

    }
    yield put(action.setFetching(false))
}
function* Register({ payload }) {
    yield put(action.setFetching(true))
    try {
        const result = yield call(authAPI.register, payload)
        if (result.ResultCode === 1) {
            yield put(stopSubmit('register', { [result.field]: result.message }))
        } else {
            yield put(action.setTokens(result.token, result.refreshToken))
            const res = yield call(authAPI.login, payload)
            yield put(action.setTokens(res.token, res.refreshToken))
        }
    } catch (error) {

    }

    yield put(action.setFetching(false))
}


export default function* () {
    yield all([
        takeEvery('AUTH/LOGIN', Login),
        takeEvery('AUTH/REGISTER', Register),
    ]);
}