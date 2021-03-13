import { call, put, takeEvery, all, select } from 'redux-saga/effects'
import actions from './actions'
import { channelAPI } from '../../api/api'
import selectors from './selectors'

function* LoadStatistic({ payload }) {
    yield put(actions.setFetching(true))
    const token = yield select(selectors.getToken)
    const channel = yield select(selectors.getCurrentChannel)
    try {
        const result = yield call(channelAPI.statistic, { token, channel })
        yield put(actions.setStatistic(result.statistic))
    } catch (error) {

    }
    yield put(actions.setFetching(false))
}

export default function* () {
    yield all([
        takeEvery('STATISTIC/LOAD', LoadStatistic),
    ]);
}