import { call, put, takeEvery, all, select } from 'redux-saga/effects'
import selectors from './selectors'
import { stopSubmit } from 'redux-form'
import actions from './actions'
import { postAPI } from '../../api/api'

function* CreatePost({ payload }) {
    yield put(actions.setFetching(true))
    const token = yield select(selectors.getToken)
    const image = yield select(selectors.getImage)
    var content = yield select(selectors.getContent)
    content = content.replaceAll('<p>', '')
    content = content.replaceAll('</p>', '')
    content = content.replaceAll(/(<ul>\n)/g, '')
    content = content.replaceAll('</ul>\n', '')
    content = content.replaceAll('<li>', '- ')
    content = content.replaceAll('</li>', '')
    content = content.replaceAll(/<span[^>]*>/g, '')
    content = content.replaceAll('</span>', '')
    content = content.replaceAll('&nbsp', '')
    content = content.replaceAll(/ style="[^"]*"/g, '')
    content = content.replaceAll('</span>', '')
    content = content.replaceAll('<p>', '')
    const data = { token, content, channel: payload.channel, image, inArchive: payload.inArchieve }
    try {
        const result = yield call(postAPI.create, data)
        yield put(actions.setCurrentPostText(''))
        yield put(actions.setImage(null))
        yield put(actions.setIsButtonDisabled(true))
    } catch (error) {

    }
    yield put(actions.setFetching(false))
}
function* getPosts({ payload }) {
    yield put(actions.setFetching(true))
    const token = yield select(selectors.getToken)
    const pageSize = yield select(selectors.getPageSize)
    const pageNumber = yield select(selectors.getCurrentPage)
    try {
        const result = yield call(postAPI.getPosts, {
            token, channel: payload.channel, pageNumber, pageSize
        })
        yield put(actions.setPosts(result.posts))
        yield put(actions.setTotalCount(result.amount))
    } catch (error) {

    }
    yield put(actions.setFetching(false))
}
function* dublicate({ payload }) {
    yield put(actions.setFetching(true))
    const page = yield select(selectors.getCurrentPage)
    const token = yield select(selectors.getToken)
    try {
        const result = yield call(postAPI.dublicate, {
            message: payload.message, channel: payload.channel, token
        })
        yield put(actions.posts(payload.channel, page))
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

    }
    yield put(actions.setFetching(false))
}
function* show({ payload }) {
    yield put(actions.setFetching(true))
    const token = yield select(selectors.getToken)
    try {
        const result = yield call(postAPI.show, {
            id: payload.id, token
        })
       // console.log('post', result);
        yield put(actions.setCurrentPost({...result.post, channelName: result.channelName}))
    } catch (error) {

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
function* archive({ payload }) {
    yield put(actions.setFetching(true))
    const page = yield select(selectors.getCurrentPage)
    const token = yield select(selectors.getToken)
    const channel = yield select(selectors.getCurrentChannel)
    try {
        const result = yield call(postAPI.archive, {
            message: payload.message, token
        })
        yield put(actions.posts(channel, page))
    } catch (error) {

    }
    yield put(actions.setFetching(false))
}
function* copyToArchive({ payload }) {
    yield put(actions.setFetching(true))
    const page = yield select(selectors.getCurrentPage)
    const token = yield select(selectors.getToken)
    const channel = yield select(selectors.getCurrentChannel)
    try {
        const result = yield call(postAPI.copyToArchive, {
            message: payload.message, token
        })
        //yield put(actions.posts(channel, page))
    } catch (error) {

    }
    yield put(actions.setFetching(false))
}
export default function* () {
    yield all([
        takeEvery('POSTS/CREATE', CreatePost),
        takeEvery('POSTS/GET', getPosts),
        takeEvery('POSTS/DUBLICATE', dublicate),
        takeEvery('POSTS/DELETE', deletePost),
        takeEvery('POSTS/SHOW', show),
        takeEvery('POSTS/TRASH', trash),
        takeEvery('POSTS/ARCHIVE', archive),
        takeEvery('POSTS/ARCHIVE/COPY', copyToArchive),
    ])
}