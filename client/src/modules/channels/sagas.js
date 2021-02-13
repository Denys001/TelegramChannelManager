import { call, put, takeEvery, all, select } from 'redux-saga/effects'
import selectors from './selectors'
import { stopSubmit } from 'redux-form'
import actions from './actions'
import { channelAPI } from '../../api/api'

function* LoadChannels({ payload }) {
    yield put(actions.setFetching(true))
    const token = yield select(selectors.getToken);
    try {
        const result = yield call(channelAPI.channels, token)
        yield put(actions.setChannels(result.channels))
    } catch (error) {

    }
    yield put(actions.setFetching(false))
}

function* AddChannels({ payload }) {
    yield put(actions.setFetching(true))
    const token = yield select(selectors.getToken)
    const code = yield select(selectors.getCode)
    try {
        const result = yield call(channelAPI.add, code, token)
        if (result.ResultCode === 0) {
            const result_channels = yield call(channelAPI.channels, token)
            yield put(actions.setChannels(result_channels.channels))
            yield put(actions.setCodeNULL())
        }
        if (result.ResultCode === 1) {
            yield put(actions.setIsError(true))
            yield put(actions.setErrorMessage(result.message))
        }
        yield put(actions.setFetching(false))
    } catch (error) {
        console.log(error);
    }
}

export default function* () {
    yield all([
        takeEvery('CHANNELS/LOAD/CHANNELS', LoadChannels),
        takeEvery('CHANNELS/ADD/CHANNELS', AddChannels),
    ]);
}