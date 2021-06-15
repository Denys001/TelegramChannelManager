import { call, put, takeEvery, all, select } from 'redux-saga/effects'
import actions from './actions'
import { postAPI } from '../../api/api'
import selectors from './selectors'

function* sendQuiz({ payload }) {
    yield put(actions.setFetching(true))

    const token = yield select(selectors.getToken)
    const channel = yield select(selectors.getCurrentChannel)
    const options = yield select(selectors.getOptions)
    const question = yield select(selectors.getQuestion)
    const type = yield select(selectors.getType)
    const explanation = yield select(selectors.getExplanation)
    const correct_option_id = yield select(selectors.getCorrectOptionId)

    try {
        var content;
        if (type === 'default') {
            content = {
                question, options
            }
        } else {
            content = {
                question, options, type, explanation: explanation.trim(), correct_option_id
            }
        }
        console.log(JSON.stringify(content));
        const result = yield call(postAPI.createQuiz, { token, channel, content: JSON.stringify(content), inArchive: payload.inArchive })
        //yield put(actions.setStatistic(result.statistic))
        yield put(actions.setInitialState())

    } catch (error) {

    }
    yield put(actions.setFetching(false))
}

export default function* () {
    yield all([
        takeEvery('QUIZS/CREATE', sendQuiz),
    ]);
}