import { call, put, takeEvery, all, select } from 'redux-saga/effects'
import selectors from './selectors'
import { stopSubmit } from 'redux-form'
import actions from './actions'
import { postAPI } from '../../api/api'

function* getPosts({ payload }) {
    yield put(actions.setFetching(true))
    const token = yield select(selectors.getToken)
    const pageSize = yield select(selectors.getPageSize)
    const pageNumber = yield select(selectors.getCurrentPage)
    try {
        const result = yield call(postAPI.getPostsInArchive, {
            token, channel: payload.channel, pageNumber, pageSize
        })
        yield put(actions.setPosts(result.posts))
        yield put(actions.setTotalCount(result.amount))
    } catch (error) {

    }
    yield put(actions.setFetching(false))
}
function* deletePost({ payload }) {
    yield put(actions.setFetching(true))
    const page = yield select(selectors.getCurrentPage)
    const token = yield select(selectors.getToken)
    const channel = yield select(selectors.getCurrentChannel)
    try {
        const result = yield call(postAPI.delete, {
            message: payload.message, token
        })
        yield put(actions.posts(channel, page))
    } catch (error) {
        alert(error.message)
    }
    yield put(actions.setFetching(false))
}
function* trash({ payload }) {
    yield put(actions.setFetching(true))
    const page = yield select(selectors.getCurrentPage)
    const token = yield select(selectors.getToken)
    const channel = yield select(selectors.getCurrentChannel)
    try {
        const result = yield call(postAPI.trash, {
            message: payload.message, token
        })
        yield put(actions.posts(channel, page))
    } catch (error) {

    }
    yield put(actions.setFetching(false))
}
function* unarchive({ payload }) {
    yield put(actions.setFetching(true))
    const page = yield select(selectors.getCurrentPage)
    const token = yield select(selectors.getToken)
    const channel = yield select(selectors.getCurrentChannel)
    try {
        const result = yield call(postAPI.unarchive, {
            message: payload.message, token
        })
        yield put(actions.posts(channel, page))
    } catch (error) {

    }
    yield put(actions.setFetching(false))
}
function* copyAndUnarchive({ payload }) {
    yield put(actions.setFetching(true))
    const page = yield select(selectors.getCurrentPage)
    const token = yield select(selectors.getToken)
    const channel = yield select(selectors.getCurrentChannel)
    try {
        const result = yield call(postAPI.copyAndUnarchive, {
            message: payload.message, token
        })
        //yield put(actions.posts(channel, page))
    } catch (error) {

    }
    yield put(actions.setFetching(false))
}
export default function* () {
    yield all([
        takeEvery('ARCHIVE/GET', getPosts),
        takeEvery('ARCHIVE/DELETE', deletePost),
        takeEvery('ARCHIVE/TRASH', trash),
        takeEvery('ARCHIVE/UNARCHIVE', unarchive),
        takeEvery('ARCHIVE/UNARCHIVE/COPY', copyAndUnarchive),
    ])
}