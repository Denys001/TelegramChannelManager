import {combineReducers} from 'redux'
import { reducer as form} from 'redux-form'

import {  reducer as auth} from '../auth'
import {  reducer as posts} from '../posts'
import {  reducer as channels} from '../channels'
import {  reducer as statistic} from '../statistic'

export default combineReducers({
    form, auth, posts, channels, statistic
})