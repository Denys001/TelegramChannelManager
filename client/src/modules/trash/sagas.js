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
        const result = yield call(postAPI.getPostsInTrash, {
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
function* backToArchive({ payload }) {
    yield put(actions.setFetching(true))
    const page = yield select(selectors.getCurrentPage)
    const token = yield select(selectors.getToken)
    const channel = yield select(selectors.getCurrentChannel)
    try {
        const result = yield call(postAPI.untrash, {
            message: payload.message, token, flag: true
        })
        yield put(actions.posts(channel, page))
    } catch (error) {
        alert(error.message)
    }
    yield put(actions.setFetching(false))
}
function* backToPublished({ payload }) {
    yield put(actions.setFetching(true))
    const page = yield select(selectors.getCurrentPage)
    const token = yield select(selectors.getToken)
    const channel = yield select(selectors.getCurrentChannel)
    try {
        const result = yield call(postAPI.untrash, {
            message: payload.message, token, flag: false
        })
        yield put(actions.posts(channel, page))
    } catch (error) {
        alert(error.message)
    }
    yield put(actions.setFetching(false))
}

export default function* () {
    yield all([
        takeEvery('TRASH/GET', getPosts),
        takeEvery('TRASH/DELETE', deletePost),
        takeEvery('TRASH/BACK_TO_PUBLISHED', backToArchive),
        takeEvery('TRASH/BACK_TO_ARCHIVE', backToPublished),
    ])
}