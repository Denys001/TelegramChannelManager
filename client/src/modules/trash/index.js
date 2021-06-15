import sagas from './sagas'
import reducer from './reducer'
import actions from './actions'
import selectors from './selectors'

export {
    reducer, sagas
}

export default {
    ...selectors, ...actions
}