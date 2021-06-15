import sagas from './sagas'
import selectors from './selectors'
import reducer from './reducer'
import actions from './actions'

export {
    reducer, sagas
}

export default {
    ...selectors, ...actions
}
