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
    const data = {token, content, channel: payload.channel, image}
    try {
        const result = yield call(postAPI.create, data)
        yield put(actions.setCurrentPostText(''))
        yield put(actions.setIsButtonDisabled(true))
        yield put(actions.setImage(null))

    } catch (error) {

    }
    yield put(actions.setFetching(false))
}

export default function* () {
    yield all([
        takeEvery('POSTS/CREATE', CreatePost),
    ]);
}