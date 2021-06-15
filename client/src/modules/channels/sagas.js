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

    } catch (error) {
        console.log(error);
    }
    yield put(actions.setFetching(false))
}
function* edit({ payload }) {
    yield put(actions.setFetching(true))
    const token = yield select(selectors.getToken)
    const currentChannel = yield select(selectors.getCurrentChannel)
    const name = payload.name
    const description = payload.description
    const photo = payload.photo
    try {
        const res = yield call(channelAPI.edit, {
            name, description, photo, channel: currentChannel, token
        })
        const result = yield call(channelAPI.channels, token)
        yield put(actions.setChannels(result.channels))

    } catch (error) {
        console.log(error);
    }
    yield put(actions.setFetching(false))
}
function* deleteChannel({ payload }) {
    yield put(actions.setFetching(true))
    const token = yield select(selectors.getToken)
    const currentChannel = yield select(selectors.getCurrentChannel)
    try {
        const res = yield call(channelAPI.delete, {
            token, channel: currentChannel
        })
        const result = yield call(channelAPI.channels, token)
        yield put(actions.setChannels(result.channels))

    } catch (error) {
        console.log(error);
    }
    yield put(actions.setFetching(false))
}

export default function* () {
    yield all([
        takeEvery('CHANNELS/LOAD/CHANNELS', LoadChannels),
        takeEvery('CHANNELS/ADD/CHANNELS', AddChannels),
        takeEvery('CHANNELS/EDIT/CHANNELS', edit),
        takeEvery('CHANNELS/DELETE/CHANNELS', deleteChannel),
    ]);
}