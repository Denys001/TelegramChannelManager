import {combineReducers} from 'redux'
import { reducer as form} from 'redux-form'

import {  reducer as auth} from '../auth'
import {  reducer as posts} from '../posts'
import {  reducer as channels} from '../channels'
import {  reducer as statistic} from '../statistic'
import {  reducer as archive} from '../archive'
import {  reducer as trash} from '../trash'
import {  reducer as quizs} from '../quizs'

export default combineReducers({
    form, auth, posts, channels, statistic, archive, trash, quizs
})